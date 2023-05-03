# YelpCamp

Web app to find and review campsites. [working version](https://campyelp-7sal.onrender.com/)

## Description

YelpCamp is a web app where users can login/register to review campsites or add their own.
Maps are included to show users the locations of campsites.
Users can add, delete, edit their own campsites and leave reviews and ratings for other campsites

## Getting Started

### Dependencies

To run locally the following is required:

* A cloudinary account
  * add a folder called "yelpcamp" to your media library on cloudinary
* A Mapbox account
* An instance of MongoDB

### Installing

* Clone repository
* add .env with the following variables:
  * CLOUDINARY_CLOUD_NAME=<your cloudinary cloud name>
  * CLOUDINARY_KEY=<your cloudinary key>
  * CLOUDINARY_SECRET=<your cloudinary secret>
  * MAPBOX_TOKEN=<your mapbox token>
  * DB_URL=mongodb+srv://<your cluster name>:<password>@cluster0.2esvc.mongodb.net/yelp_camp

### Executing program

* In the terminal run
```
npm i
```
* To seed the database with fake content first add images to cloudinary media library in yelpcamp folder
* Then in the terminal run
```
node seeds/index
```
* To start run 
```
npm start
```
