<?php
/**
 * Class Mail
 *
 */

class Mail {

    /**
     * Default variables
     */
    private $EmailTo;

    /**
     * Initalize object
     *
     * @$sEmailFrom
     * @$sSubject
     * @$sNameFrom
     * @$sMessage
     * construct $sBody
     *
     */
    public function __construct($sEmailTo, $sEmailFrom, $sSubject, $sNameFrom, $sMessage)
    {
        define("__SERVERROOT__", $_SERVER['DOCUMENT_ROOT']);

        //Get objects and save in variables
        $this->EmailTo = $sEmailTo;
        $this->EmailFrom = $sEmailFrom;
        $this->Subject = $sSubject;
        $this->NameFrom = $sNameFrom;
        $this->Message = $sMessage;

        //create email
        $sBody = $this->Email($sSubject, $sNameFrom, $sMessage);

        //send email
        $this->SendMail($sEmailFrom, $this->EmailTo, $sSubject, $sNameFrom, $sBody);
    }

    /**
     * send email
     *
     * @$sEmailFrom
     * @$sEmailTo
     * @$sSubject
     * @$sNameFrom
     * @$sBody
     *
     * return @bool
     */
    private function SendMail($sEmailFrom, $sEmailTo, $sSubject, $sNameFrom, $sBody)
    {
        $headers = "From: ".$sNameFrom." <".$sEmailFrom.">\n";
        $headers .= "Reply-To: ".$sNameFrom." <".$sEmailFrom.">\n";
        $headers .= "MIME-Version: 1.0\n";
        $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\n";

        if(mail($sEmailTo, $sSubject, $sBody, $headers)) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * create the email in html
     *
     * @$sSubject
     * @$sNameFrom
     * @$sMessage
     *
     * return string
     */
    private function Email($sSubject, $sNameFrom, $sMessage){
        include __SERVERROOT__."/0882275/jaar2/kw4/mimeme/includes/email/email-template.php";
        $sBody = ob_get_clean();

        return $sBody;
    }

}