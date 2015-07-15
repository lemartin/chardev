<?php
require_once __DIR__ . "/../../app/bootstrap.php";

use chardev\Ajax;
use chardev\FormatHelper;
use chardev\forum\ForumHelper;
use chardev\forum\facades\ThreadFacade;

\chardev\Session::startBackendSession();

if (!isset($_POST['action'])) {
    Ajax::dieOnError("No action given!");
}

$user = \chardev\Session::getLoggedInUser();

if (!$user) {
    Ajax::dieOnError("You are not logged in!");
}

try {
    $permissions = new chardev\forum\ForumPermissions($user);
    $db = new chardev\forum\ThreadDatabase("mysql:dbname=chardev_user;host=127.0.0.1", "root", "");

    switch ($_POST['action']) {
        case 'edit':
            if (!isset($_POST['content'])) {
                Ajax::dieOnError("The content is empty!");
            }
            if (!isset($_POST['post'])) {
                Ajax::dieOnError("No post found!");
            }

            $postId = (int)$_POST['post'];
            $post = $db->getPost($postId);
            $thread = $db->getThread($post["ThreadID"]);
            $hook = $db->getHook($thread["ThreadHookID"]);

            $threadFacade = new ThreadFacade($hook, $thread);

            $db->editPost($postId, $post['Title'], $_POST['content']);
            $postPos = $db->getPositionOfPost($postId);
            $page = floor(($postPos - 1) / ForumHelper::POSTS_PER_PAGE) + 1;

            $count = $threadFacade->getPostCount();

            Ajax::autoRedirect(ForumHelper::getThreadUrl($threadFacade, ceil($count / ForumHelper::POSTS_PER_PAGE)) . '#' . $count);

            break;
        case 'reply':
            if (!isset($_POST['content'])) {
                Ajax::dieOnError("The content is empty!");
            }
            if (!isset($_POST['thread'])) {
                Ajax::dieOnError("No thread found!");
            }

            $threadId = (int)$_POST['thread'];
            $thread = $db->getThread($threadId);
            $hook = $db->getHook($thread["ThreadHookID"]);

            $threadFacade = new ThreadFacade($hook, $thread);

            $postId = $db->replyTo($thread['InitialPostID'], $user->getId(), 'RE: ' . $thread['Title'], $_POST['content']);
            $postPos = $db->getPositionOfPost($postId);
            $page = floor(($postPos - 1) / ForumHelper::POSTS_PER_PAGE) + 1;

            $count = $threadFacade->getPostCount() + 1;

            Ajax::autoRedirect(ForumHelper::getThreadUrl($threadFacade, ceil($count / ForumHelper::POSTS_PER_PAGE)) . '#' . $count);

            break;
        case 'new_thread':
            if (!isset($_POST['content'])) {
                Ajax::dieOnError("The content is empty!");
            }
            if (!isset($_POST['title'])) {
                Ajax::dieOnError("The title is empty!");
            }
            if (!isset($_POST['hook'])) {
                Ajax::dieOnError("No thread hook found!");
            }

            $hook = (int)$_POST['hook'];

            $threadId = 0;

            switch ($_POST['type']) {
                case 'sticky':
                    if (!$permissions->mayCreateStickies($hook)) {
                        Ajax::dieOnError("You are not allowed to create stickies!");
                    }
                    $threadId = $db->createSticky($hook, $user->getId(), $_POST['title'], $_POST['content']);
                    break;
                case 'announcement':
                    if (!$permissions->mayCreateAnnouncements($hook)) {
                        Ajax::dieOnError("You are not allowed to create announcements!");
                    }
                    $threadId = $db->createAnnouncement($hook, $user->getId(), $_POST['title'], $_POST['content']);
                    break;
                case 'thread':
                    if (!$permissions->mayCreateThreads($hook)) {
                        Ajax::dieOnError("You are not allowed to create new threads!");
                    }
                    $threadId = $db->createThread($hook, $user->getId(), $_POST['title'], $_POST['content']);
                    break;
                default:
                    throw new Exception("Invalid thread type: {$_POST['type']}!");
            }

            $thread = $db->getThread($threadId);
            $hook = $db->getHook($thread["ThreadHookID"]);
            $threadFacade = new ThreadFacade($hook, $thread);

            Ajax::autoRedirect(ForumHelper::getThreadUrl($threadFacade, 1));

            break;
        case 'delete_thread':
            if (!isset($_POST['thread'])) {
                Ajax::dieOnError("No thread found!");
            }
            $threadId = (int)$_POST['thread'];
            $thread = $db->getThread($threadId);
            $hook = $db->getHook($thread["ThreadHookID"]);
            $threadFacade = new ThreadFacade($hook, $thread);

            if ($permissions->mayDeleteThread($threadFacade)) {
                $db->deleteThread($threadId);
                echo json_encode(ForumHelper::getHookUrl($threadFacade->getHook()));
            } else {
                Ajax::dieOnError("You are not allowed to delete this thread!");
            }

            break;
        case 'lock_thread':
            if (!isset($_POST['thread'])) {
                Ajax::dieOnError("No thread found!");
            }
            $threadId = (int)$_POST['thread'];
            $thread = $db->getThread($threadId);
            $hook = $db->getHook($thread["ThreadHookID"]);

            if ($permissions->mayLockThread(new ThreadFacade($hook, $thread))) {
                $db->lockThread($threadId);
            } else {
                Ajax::dieOnError("You are not allowed to lock this thread!");
            }

            break;
        case 'unlock_thread':
            if (!isset($_POST['thread'])) {
                Ajax::dieOnError("No thread found!");
            }
            $threadId = (int)$_POST['thread'];
            $thread = $db->getThread($threadId);
            $hook = $db->getHook($thread["ThreadHookID"]);

            if ($permissions->mayLockThread(new ThreadFacade($hook, $thread))) {
                $db->unlockThread($threadId);
            } else {
                Ajax::dieOnError("You are not allowed to unlock this thread!");
            }

            break;
        default:
            Ajax::dieOnError("No action given!");
    }
} catch (Exception $e) {
    Ajax::dieOnException($e);
}