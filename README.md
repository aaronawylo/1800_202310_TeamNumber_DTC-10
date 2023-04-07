# Project Title

## 1. Project Description

State your app in a nutshell, or one-sentence pitch. Give some elaboration on what the core features are.  

Our application provides users resources based on health, supplies and finance depending on the category they select.

- Users can filter resources based on the main categories of health, supplies, and finance or by different weather conditions
- Users can create reviews for resources so other users may evaluate its usefulness
- Users can save resources for later use


## 2. Names of Contributors

List team members and/or short bio's here...

* Hi, my name is Lulu, nice to meet you!
* Hi, my name is Aaron and I am excited to be here in this course!
* Derek Tran is here 

	
## 3. Technologies and Resources Used

List technologies (with version numbers), API's, icons, fonts, images, media or data sources, and other resources that were used.

- HTML, CSS, JavaScript
- Bootstrap 5.0 (Frontend library)
- Firebase 8.0 (BAAS - Backend as a Service)
- Google Material Icons

## 4. Complete setup/installion/usage

State what a user needs to do when they come to your project. How do others start using your code or application?
Here are the steps ...

- login or sign up
- read the cards on the carousel
- click learn more for whatever topic their interested in
- browse displayed resources
- look at reviews for any resources that pique their interest
- click view button or save button for any resources they're interested in
- visit profile page to view saved articles
- write review for resources after viewing their website


## 5. Known Bugs and Limitations

Here are some known bugs:

- Article pages only display one or two articles if the user isnt logged in
- ...
- ...

## 6. Features for Future

What we'd like to build in the future:

- Pull resources from some kind of API instead of creating database by ourselves
- ...
- ...

## 7. Contents of Folder

Content of the project folder:

```
 Top level of project folder:
├── .gitignore               # Git ignore file
├── index.html               # landing HTML file, this is what users see when you come to url
├── main.html                # page users arrive at after login
├── 404.html                 # file added from Firebase deployment
├──.firebaserc               # file added frome Firebase deployment
├── firebase.json            # file added from Firebase deployment
├── firestore.indexes.json   # file added from Firebase deployment
├── firestore.rules          # file added from Firebase deployment
└── README.md

It has the following subfolders and files:
├── .git                     # Folder for git repo

├── .firebase                # Folder added from Firebase deployment
    hosting..cache           # file added from Firebase deployment

├── scripts                  # Folder for scripts
    articlelist.js           # scripts for article list page
    authentiaction.js        # scripts for user sign-up and login
    profile.js               # scripts for profile page
    references.js            # scripts for references page
    review.js                # scripts for review page
    search.js                # scripts for article page after using search bar
    skeleton.js              # scripts for loading navbar and footer

├── styles                   # Folder for styles
    style.css                # CSS properties

├── text                     # HTML loaded on other pages
    colddescription.html
    earthquakedescription.html
    financedescription.html
    firedescription.html
    flooddescription.html
    footer.html              # HTML for app footer
    healthdescription.html
    heatdescription.html
    nav.html                 # HTML for app navbar
    suppliesdescription.html
    thunderstormdescription.html
    winddescription.html

├── article_pages            # Contains pages that display resources pulled from Firebase
    articlelist.html         # article page accessed through navbar dropdowns
    search.html              # article page accessed through search bar

├── footer_pages             # Contains pages accessed through the links in the footer
    footerlinks.html         # page containing About Us section, Contact information, and Faqs
    references.html          # lists all resources in Firebase as links

├── user_interaction         # Contains pages where user can write to the database
    profile.html             # page where user can update account information and find saved articles
    review.html              # page where user can write reviews for an article and see other user reviews for that article
