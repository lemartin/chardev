<?php

require_once __DIR__ . "/../../app/bootstrap.php";

use chardev\Ajax;
use chardev\Session;
use chardev\backend\UserDatabase;

Session::startBackendSession();

$ud = null;

try {
    $user = Session::getLoggedInUser();

    if (isset($_POST['UserId']) && isset($_POST['Password'])) {
        $loggedInUser = Session::getLoggedInUser();

        if (!$loggedInUser || $loggedInUser->getId() != $_POST['UserId']) {
            throw new \Exception("You are not allowed to change this password!");
        }

        if (!$_POST['Password']) {
            throw new \Exception("The received password was empty!");
        }

        UserDatabase::getInstance()->changePassword($_POST['UserId'], $_POST['Password']);
    } else if (isset($_POST['Logout'])) {
        Session::logout();
    } else if (isset($_POST['UserName']) && isset($_POST['Password'])) {
        try {
            $loggedInUser = Session::login($_POST['UserName'], $_POST['Password'], isset($_POST['Cookie']) ? true : false);
            echo json_encode($loggedInUser->getJsUserData());

        } catch (\InvalidArgumentException $iae) {
            Ajax::dieOnError("Unable to log in", "Invalid inputs: " . $iae->getMessage());
        }
        catch (\chardev\backend\RegistrationPendingException $rpe) {
            Ajax::dieOnError(
                "Unable to log in",
                "Your registration is pending!<br/>" .
                    "You should have received an activation email, if not, click <a class='std_link' href='?resend_mail&to=" . $_POST['UserName'] . "'>here</a> to send the mail again."
            );
        }
        catch (\chardev\backend\WrongUserNamePasswordException $rpe) {
            Ajax::dieOnError(
                "Unable to log in",
                "Wrong user name or password"
            );
        }
    } else {
        if (isset($_GET['ForumSignature'])) {
            echo json_encode($user->setForumSignature($_GET['ForumSignature']));
        } else if (isset($_GET['Region'])) {
            echo json_encode($user->setRegion($_GET['Region']));
        } else if (isset($_GET['Avatar'])) {
            echo json_encode($user->setAvatar($_GET['Avatar']));
        } else if (isset($_GET['Language'])) {
            echo json_encode($user->setLanguage($_GET['Language']));
        } else if (isset($_GET['BattleNetProfiles'])) {
            $data = json_decode($_GET['BattleNetProfiles']);
            if ($data == null) {
                Ajax::dieOnError("Invalid data object format!");
            }

            if (isset($data->addBattleNetProfile)) {
                $add = $data->addBattleNetProfile;
                try {
                    $user->addBattlenetProfile($add->Name, $add->Realm, $add->Region);

                    echo json_encode($user->getBattlenetProfiles());
                } catch (Exception $e) {
                    Ajax::dieOnException($e);
                }
            } else if (isset($data->removeBattleNetProfile)) {
                $add = $data->removeBattleNetProfile;
                try {
                    $user->removeBattlenetProfile($add->Name, $add->Realm, $add->Region);

                    echo json_encode($user->getBattlenetProfiles());
                } catch (Exception $e) {
                    Ajax::dieOnException($e);
                }
            }
        }
    }
} catch (Exception $e) {
    Ajax::dieOnException($e);
}