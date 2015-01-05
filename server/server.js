if (Meteor.isServer) {
    Meteor.methods({
        sendStrangerNotification: function(email, html) {
            this.unblock();
            //process.env.MAIL_URL = 'smtp://jjnathanjr@gmail.com:2032930j@smtp.googlemail.com:465/';
            Email.send({
                to: email,
                from: "Jason Nathan <jjnathanjr@gmail.com>",
                subject: "Jason J Nathan's Online Resume Notification",
                text: "Thank you for your interest in my resume. While this notification email is automated, I will send you personalised emails when I make changes to my online resume at resume.jasonnathan.com. At any point in time, please send an email to jjnathanjr@gmail.com should you wish to unsubscribe.Thanks and regards. :) Jason J Nathan +65 90220964",
                html: html
            });
            Email.send({
                to: "Jason Nathan <jjnathanjr@gmail.com>",
                from: email,
                subject: "New notification sign up",
                text: "A sign up notification from resume to: " + email
            });
        },
        sendNewContactEmail: function(options) {
            this.unblock();
            options = options || {}
            options.to = "Jason Nathan <jjnathanjr@gmail.com>";
            //process.env.MAIL_URL = 'smtp://jjnathanjr@gmail.com:2032930j@smtp.googlemail.com:465/';
            Email.send(options);
        }
    });
}
