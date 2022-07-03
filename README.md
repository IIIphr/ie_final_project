# Torobche (a small version of Torob)
![main page](main_page.png "Main page")
This is the main page. You can search for products here, or press the "all products" button from the navigation bar.

Alternatively, you can access all products by searching for no category and no search query. An empty search query means that you want everything in the categories you selecetd.

Selecting no category means you want to search in everyone of them (It's like you chekced all of the boxes, which is boring :D)

So no boxes selected and no search query = all products.

![products page](products_page.png "Products page")
This is the products page. You can press the grey buttons (which are the name of the products) to go to the product's page.

If you were logged in as a user (not a seller, which is logged in now. You can see it in the third part off navigation bar. And oh, we have dark and light themes too, the fourth button :D), the page would look like this:
![products page](user_products.png "Products page")
Which has the favorite buttons.

And you can explore the rest of the site and find out what is implemented here :) 

Just a quick note. When you are adding a product to a shop, that is already registered in the site (the product), you can search (with the exact same logic of the main page) for the product and click the "set ID" button next to the product you want to add to your shop. Find the page yourself :D

## Running the site locally

You should have npm installed. We use MongoDB for this project, so you might as well have that :)

the front_end and back_end folders are client and server applications, respectively. Go to each folder and run:

`npm install`

to install the dependencies. Then, for running the server, use:

`node index.js`

in the back_end folder. You can run the client side application by using:

`npm start`

in the front_end folder. Have fun with the site :D