<?php

namespace chardev\forum;

use chardev\FormatHelper;
use chardev\TemplateHelper;
use chardev\backend\data\ItemData;
use chardev\backend\entities\Item;
use chardev\backend\entities\User;
use chardev\forum\ThreadDatabase;
use chardev\forum\facades\HookFacade;
use chardev\forum\facades\PostFacade;
use chardev\forum\facades\ThreadFacade;
use chardev\forum\facades\UserFacade;

class ForumHelper
{
    const POSTS_PER_PAGE = 20;
    const THREADS_PER_PAGE = 20;

    public static function getLatestThreadPost( ThreadDatabase $db, $hook)
    {
        $latestPost = $db->getLatestPost($hook["ID"]);

        if ($latestPost) {
            $user = new UserFacade(new User($latestPost ['AuthorID']));
            $thread = new ThreadFacade($hook, $db->getThread($latestPost["ThreadID"]));

            return array(
                "User" => $user,
                "RoleCSS" => ForumHelper::roleToCssClass($user),
                "Date" => ForumHelper::timestampToString(( int )$latestPost ['Created']),
                "Link" => ForumHelper::getThreadLastPostLink($thread, 30)
            );
        } else {
            return null;
        }
    }

    public static function roleToCssClass( UserFacade $user)
    {
        if ($user->isAdmin()) {
            return 'forum_author_admin';
        } else if ($user->hasDonated()) {
            return 'forum_author_donor';
        } else {
            return 'forum_author';
        }
    }

    public static function getAvailableForumCode()
    {

        $codes = array("Links" => array("[url]http://example.org[/url]", "[url=http://example.org]click here[/url]"), "Images" => array("[img]http://chardev.org/images/site/favico.png[/img]"), "Text" => array("[i]underline[/i]", "[b]italic[/b]", "[u]bold[/u]", "[color=ff0000]green[/color]"), "Items" => array("[item]192[/item]", "http://www.wowhead.com/item=13385"));

        $html = "";

        foreach ($codes as $k => $v) {
            $plain = "";
            $parsed = "";
            for ($i = 0; $i < count($v); $i++) {
                $str = ForumHelper::replaceCode($v [$i]);
                $plain .= "<div class='fo_code_plain'>{$v[$i]}</div>";
                $parsed .= "<div class='fo_code_parsed'>{$str}</div>";
            }
            $html .= "
			<tr>
			<td class='fo_code_td' valign='top'>
			<div class='fo_code_name'>{$k}</div>
			</td>
			<td class='fo_code_td'>{$plain}</td>
			<td class='fo_code_td'>{$parsed}</td>
			</tr>";
        }

        return "<div class='fo_code_p'>
			<div class='fo_code_h'>Available Codes</div>
			<table class='fo_code_tab' cellpadding='0' cellspacing='0'>
			{$html}
			</table>
			</div>";
    }

    public static function getThreadLastPostLink( ThreadFacade $thread, $maxLength)
    {

        return self::getGenericThreadLink(
            $thread,
            $thread->getPostCount(),
            ceil($thread->getPostCount() / self::POSTS_PER_PAGE),
            $maxLength
        );
    }

    public static function timestampToString($timestamp)
    {
        date_default_timezone_set("Europe/Berlin");

        $today = getdate();
        $date = getdate($timestamp);
        $dateStr = "";

        if ($today ["year"] == $date ["year"]) {
            $dif = $today ["yday"] - $date ["yday"];
            if ($dif == 0) {
                $dateStr = "today";
            } else if ($dif == 1) {
                $dateStr = "yesterday";
            } else if ($dif <= 7) {
                $dateStr = $dif . " days ago";
            } else {
                $dateStr = date("M jS Y", $timestamp);
            }

            return $dateStr . " at " . date("g:i A", $timestamp);
        }

        return date("M jS Y \a\\t g:i A", $timestamp);
    }

    public static function replaceCode($str)
    {
        $str = preg_replace("/\[url\](.*?)\[\/url\]/i", "<a target='_blank' class='forum_content_link' href='$1'>$1</a>", $str);
        $str = preg_replace("/\[url\=(.*?)\](.*?)\[\/url\]/i", "<a target='_blank' class='forum_content_link' href='$1'>$2</a>", $str);
        // [img]
        $str = preg_replace("/\[img\](.*?)\[\/img\]/i", "<img alt='$1' src='$1'>", $str);
        // bold
        $str = preg_replace("/\[b\](.*?)\[\/b\]/i", "<b>$1</b>", $str);
        // italic
        $str = preg_replace("/\[i\](.*?)\[\/i\]/i", "<i>$1</i>", $str);
        // underline
        $str = preg_replace("/\[u\](.*?)\[\/u\]/i", "<u>$1</u>", $str);
        // color
        $str = preg_replace("/\[color=(.*?)\](.*?)\[\/color\]/i", "<span style='color:#$1'>$2</span>", $str);
        // quote
        $str = preg_replace("/\[quote\](.*?)\[\/quote\]/i", "<i>&bdquo;$1&rdquo;</i>", $str);
        // center
        $str = preg_replace("/\[center\](.*?)\[\/center\]/i", "<center>$1</center>", $str);
        // [item]
        $str = preg_replace_callback("/\[item\](\d+)\[\/item\]/i", 'self::replaceItemLink', $str);
        $str = preg_replace_callback("/http\:\/\/(?:\w+\.)?wowhead\.com\/\?item\=([\d]+)/i", 'self::replaceExternItemLink', $str);
        $str = preg_replace_callback("/http\:\/\/(?:\w+\.)?wowhead\.com\/item\=([\d]+)/i", 'self::replaceExternItemLink', $str);
        $str = preg_replace_callback("/http\:\/\/(?:\w+\.)?thottbot\.com\/i(?:tem\=)?([\d]+)/i", 'self::replaceExternItemLink', $str);
        $str = preg_replace_callback("/http\:\/\/(?:\w+\.)?battle\.net\/wow\/\w+\/item\/([\d]+)/i", 'self::replaceExternItemLink', $str);
        $str = preg_replace_callback("/http\:\/\/(?:\w+\.)?wowarmory\.com\/item\-info\.xml\?i\=([\d]+)/i", 'self::replaceExternItemLink', $str);
        return nl2br($str);
    }

    private static function replaceExternItemLink($match)
    {
        return $match [0] . " " . ForumHelper::replaceItemLink($match);
    }

    private static function replaceItemLink($match)
    {
        if ($match [1]) {

            $data = ItemData::getInstance()->fromId($match [1]);

            if ($data) {
                $item = new Item ($data);
                return "<a class='fo_item_link item_quality_{$item->getQuality()}' href='" . TemplateHelper::getBasePath() . "item/{$match[1]}.html' onmousemove='Chardev.moveTooltip()' onmouseover='Chardev.showItemTooltip({$match[1]})' onmouseout = 'Chardev.hideTooltip();'>{$item->getName()}</a>";
            } else {
                return "<font class='grey'>Item not found (id " . $match [1] . ")!</font>";
            }
        }
        return "";
    }

    public static function getMaxPagesHook($hook)
    {
        return ceil($hook['ThreadCount'] / ForumHelper::THREADS_PER_PAGE);
    }

    public static function getMaxPagesThread( ThreadFacade $thread)
    {
        return ceil($thread->getPostCount() / ForumHelper::POSTS_PER_PAGE);
    }

    public static function getThreadPostIndex($page, $index)
    {
        return ($page - 1) * ForumHelper::POSTS_PER_PAGE + $index + 1;
    }

    public static function validateArgs(\chardev\forum\ThreadDatabase $db, $forumAction, $threadAction = null)
    {

        $parsedHookUrl = FormatHelper::parseVerboseUrl($forumAction);
        $parsedThreadUrl = null;

        if (!$parsedHookUrl) {
            header("Location: " . TemplateHelper::getBasePath() . self::getForumUrl());
            die;
        }
        if ($threadAction) {
            $parsedThreadUrl = FormatHelper::parseVerboseUrl($threadAction);
        }

        $hook = null;
        $thread = null;
        $threadFacade = null;

        $hook = $db->getHook((int)$parsedHookUrl["ID"]);
        $hookFacade = new HookFacade($hook);

        if ($parsedThreadUrl) {
            $thread = $db->getThread((int)$parsedThreadUrl["ID"]);
        }

        if ($thread) {
            $threadFacade = new ThreadFacade($hook, $thread);
            $page = $parsedThreadUrl["Page"];
            $pages = ForumHelper::getMaxPagesThread($threadFacade);
        } else {
            $page = $parsedHookUrl["Page"];
            $pages = ceil($db->getThreadCount($hook) / self::THREADS_PER_PAGE);
        }

        $redirect = false;
        //
        // Check the parsed forum name against the expected name
        if (!$redirect && FormatHelper::escapeForUrl($hookFacade->getName()) != $parsedHookUrl["Name"]) {
            $redirect = true;
        }
        //
        // Check the parsed thread name
        if ($thread && !$redirect && FormatHelper::escapeForUrl($threadFacade->getTitle()) != $parsedThreadUrl["Name"]) {
            $redirect = true;
        }
        //
        // Check whether the page is within bounds (1,max page)
        if ($page < 1 || $page > $pages) {
            $redirect = true;
            $page = min(max($page, 1), $pages);
        }
        //
        // Redirect if necessary
        if ($redirect) {
            if ($thread) {
                header("Location: " . TemplateHelper::getBasePath() . self::getThreadUrl($threadFacade, $page));
                die;
            } else {
                header("Location: " . TemplateHelper::getBasePath() . self::getHookUrl($hookFacade, $page));
                die;
            }
        }

        return array(
            "Thread" => $threadFacade,
            "Hook" => $hookFacade,
            "Page" => $page,
            "Pages" => $pages
        );
    }

    public static function getThreadUrl( ThreadFacade $threadFacade, $page = 1)
    {
        return TemplateHelper::getBasePath() . 'forum/' .
            FormatHelper::verboseUrl($threadFacade->getHook()->getId(), $threadFacade->getHook()->getName()) . '/' .
            FormatHelper::verboseUrl($threadFacade->getId(), $threadFacade->getTitle(), $page) . '.html';
    }

    public static function getForumUrl()
    {
        return TemplateHelper::getBasePath() . 'Forum.html';
    }

    public static function getHookUrl( HookFacade $hook, $page = 1)
    {
        return TemplateHelper::getBasePath() . 'forum/' .
            FormatHelper::verboseUrl($hook->getId(), $hook->getName(), $page) . '.html';
    }

    public static function getThreadLink( ThreadFacade $threadFacade, $page = 1)
    {
        return self::getGenericThreadLink($threadFacade, null, $page, 50);
    }

    private static function getGenericThreadLink( ThreadFacade $threadFacade, $anchor, $page = 1, $length = 50)
    {
        $prefix = "";
        $cssClass = "";
        if ($threadFacade->isSticky()) {
            $cssClass = "forum_topic_sticky_link";
        } else if ($threadFacade->isAnnouncement()) {
            $cssClass = "forum_topic_announcement_link";
        } else if ($threadFacade->isLocked()) {
            $cssClass = "forum_topic_locked_link";
            $prefix = "Locked: ";
        }

        return "<a class=\"$cssClass\" title=\"\" href=\"" .
            self::getThreadUrl($threadFacade, $page) . ($anchor ? "#" . $anchor : "") .
            "\" >" . $prefix . FormatHelper::shorten($threadFacade->getTitle(), $length) . "</a>";
    }

    public static function getUserUrl( UserFacade $user)
    {
        return TemplateHelper::getBasePath() . 'user/' . FormatHelper::verboseUrl($user->getId(), $user->getName()) . '.html';
    }

    public static function getUserLink( UserFacade $user)
    {
        $css = self::roleToCssClass($user);
        $url = self::getUserUrl($user);
        $name = htmlspecialchars($user->getName());

        return "<a href=\"".$url."\" class=\"{$css}\">{$name}</a>";
    }

    public static function getAvatar( UserFacade $author, $class = 'forum_avatar')
    {
        $avatar = $author->getAvatar();
        if ($avatar) {
            echo "<img class='{$class}' src='/images/icons/large/{$author->getAvatar()}.png' />";
        }
    }

    public static function getPostAnchor( PostFacade $post, $page, $index)
    {
        $pos = $post->getPosition() + 1;
        $threadUrl = self::getThreadUrl($post->getThread(), $page);

        return "<a class='forum_post_anchor' name='{$pos}' href='{$threadUrl}#{$pos}'>#{$pos}</a>";
    }

    public static function getThreadCreateLink( HookFacade $hook)
    {
        $url = TemplateHelper::getBasePath() . 'forum/' . FormatHelper::verboseUrl($hook->getId(), $hook->getName()) . '/NewThread.html';
        return "<a class=\"button button_light fo_header_action\" href='{$url}'>New Thread</a>";
    }

    public static function getReplyLink( ThreadFacade $thread)
    {
        $url = TemplateHelper::getBasePath() . 'forum/' .
            FormatHelper::verboseUrl($thread->getHook()->getId(), $thread->getHook()->getName()) . '/' .
            FormatHelper::verboseUrl($thread->getId(), $thread->getTitle()) . '/Reply.html#Bottom';
        return "<a class=\"button button_light fo_header_action\" href='{$url}'>Reply</a>";
    }

    public static function getDeleteThreadLink( ThreadFacade $thread)
    {
        return "<a class=\"button button_light fo_header_action\" href=\"javascript:Chardev.deleteThread({$thread->getId()})\" >Delete</a>";
    }

    public static function getLockThreadLink( ThreadFacade $thread)
    {
        if ($thread->isLocked()) {
            return "<a class=\"button button_light fo_header_action\" href=\"javascript:Chardev.unlockThread({$thread->getId()})\" >Unlock</a>";
        } else {
            return "<a class=\"button button_light fo_header_action\" href=\"javascript:Chardev.lockThread({$thread->getId()})\" >Lock</a>";
        }
    }

    public static function getEditPostLink( PostFacade $post)
    {
        $url = TemplateHelper::getBasePath() . 'forum/' .
            FormatHelper::verboseUrl($post->getThread()->getHook()->getId(), $post->getThread()->getHook()->getName()) . '/' .
            FormatHelper::verboseUrl($post->getThread()->getId(), $post->getThread()->getTitle(), self::getPageOfPost($post)) . '/Edit.html?Post=' . $post->getId();
        return "<a class='fo_post_header_action' href='{$url}'>Edit</a>";
    }

    public static function getDeletePostLink( PostFacade $post)
    {
        return "<a class=\"fo_post_header_action\" href=\"javascript:Chardev.deletePost({$post->getId()})\" >Delete</a>";
    }

    public static function getPageOfPost( PostFacade $post)
    {
        return ceil(($post->getPosition() + 1) / self::POSTS_PER_PAGE);
    }
}