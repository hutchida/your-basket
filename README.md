# your-basket
 
This is a simple Vue2 app that tests working with the Vuex store. The app shows just one page which is what the user has in their basket after having added items to it from an imaginary part of the site. Some default values are already added and the user can increase or decrease the quantities of those products. The totals and subtotals will all update dynamically when the quantities change. The user is also able to manually change the input number of the quantities, though the app permits only numbers from 1 up to and including 10. There is a trashcan icon at the side of each product row so the user can remove the product completely from the basket. When the user is ready they can click the 'Buy Now' button which simulates sending an axios request with the json product data. That json is printed to the console for transparency. An alert is also triggered when the 'Buy Now' button is pressed that shows the user the total amount they will have paid for. 

# Instructions

You will need to have the vue cli installed globally, then babel locally, then run the app:

npm install @vue/cli-service -g

npm install babel

npm run serve
