// Simple implementation example

include("StacksAuth.js");

Content.makeFrontInterface(600, 600);

const var AuthPanel = Content.getComponent("AuthPanel");
const var ErrorMessageLabel = Content.getComponent("ErrorMessageLabel");
const var MainPanel = Content.getComponent("MainPanel");



inline function checkAuthentication() {
    local authenticated = StacksAuth.authenticate();

    if (authenticated) {
        AuthPanel.showControl(false);
        MainPanel.showControl(true);
    } else {
        AuthPanel.showControl(true);
        MainPanel.showControl(false);
        ErrorMessageLabel.set("text", StacksAuth.getLastErrorMessage());
    }
}


checkAuthentication();