# SideMissions
   Sidemissions aims to provide a platform where users can find different kinds of quick jobs to allow users to gain additional revenue.
   This will benefit the people who are looking to get extra income from the comfort of their own homes or from their own skills.

## Prerequisites
To set up the local web application, download and install the following modules: 

- [Node JS](https://nodejs.org/en/download/)
- [MongoDB](https://www.mongodb.com/download-center/community)

## Installing
To run the server, open up the command prompt and navigate through the folder where the files are contained. To create the node modules, use the command 
  - npm install express
  - npm i express
  - npm i body-parser
  - npm i cookie-parser
  - npm i session
  - npm i express-session
  - npm i hbs
  - npm i moongose
  - npm i nodemon(*optional)

to start the server, use the command

            node index.js
            
Lastly, on your browser (the members use Google Chrome), enter the url

            localhost:3000

## Running the tests
Once the server is running, it will be available at localhost:3000. This will show the homepage of the web application where you are chosen between logging in or registering a new account.

To register, fill out the necessary input text fields in the form and press the "Register" button. You may then proceed to log in with the email and password.

If you chose to Login first, you may enter any of the credentials below:
| username | password |
| --- | --- |
| y2aquino | passwordy2 |
| yenwich | passwordyen |
| thefish | passwordmichael |
| jhosemhighuel | passwordjhose |

Once logged in, it will bring you to your profile where you can see all you posts. You will also see a header with buttons that allow you to search for posts, go back to your profile, go to the newsfeed, see your notifications, see your Saved and Followed posts, Edit profile and Log out. From this page, you can now explore the web app and interact with other users.
#### Create Post
For a user to create a post, you must provide a title and the text. Adding an image is optional and will only support png and jpeg files. A user is also allowed to edit a post and change the image as well. 

#### Edit Profile
You may edit your profile picture, main and secondary characters in the profile page. To navigate to your profile pagr from the Newsfeed, click your Name on the upper right of the header bar.

#### Like, Dislike, Save, Follow and Report Post
Users are capable of commenting, liking and disliking posts of all users. When a user does any of these, a notification is sent to the owner of the post. They are also allowed to save and follow posts. This will show up in the Saved and Followed page of the user.

### For Admins
To login as admin, enter the following credentials:
| username | password |
| --- | --- |
| admin | admin |

This will log you in to the admin account. An admin account keeps track of the posts, users, reports, and announcements. 

#### Post Announcements
As an admin, you can post announcements that can be seen on the newsfeed of the registered members. 

#### Ban Users
They can also delete posts, view reports, and ban users. There is a set of guidelines that an admin must follow when banning users. Terms and conditions being checked to determine whether the user is a candidate for being banned.

## Versioning
We used Google Drive for versioning. Our google drive may be accessed [here](https://drive.google.com/drive/folders/1u64uhkbHmnUapY5umzwumQuTVwnF4OkX?usp=sharing).

## Authors
- ANYAYAHAN, Loren Rae
- AQUINO, Jose III
- DE ASIS, Jhose Mhiguel
