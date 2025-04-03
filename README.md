# STACKS Auth - HISE

This repository reflects the latest official means of implementing Stacks Authentication into audio plugins built with HISE. It is designed to be lightweight and generic so that the plugin developer can implement it into their project regardless of current structure.

## Getting Started

1. Copy the `StacksAuth.js` file in this repository into your HISE project's `Scripts` folder.

2. Open the file in your preferred editor. Change the `stacksProductId` variable on line 12 to the id of your product on Stacks. If you're not sure what your product id is, navigate to the product on Stacks. The product id is the last path segment (e.g., in the url `https://stacks.audio/products/string-central-ejyn`, the id is `string-central-ejyn`)

3. Change the `publicKey` variable on line 13 to your public RSA key. You may use an existing key if you have one, or you can generate a new RSA key pair for use in Stacks.

## Implementation Guide

Once you've updated the values in `StacksAuth.js`, you can import the `StacksAuth` namespace wherever you prefer using the line `include("StacksAuth.js");`. There are two utility functions provided:

1. `StacksAuth.authenticate()`

   - Returns a boolean value reflecting whether the user can access the product.

2. `StacksAuth.getLastErrorMessage()`
   - Returns a string value detailing the reason for failure in the last call to `authenticate()`.

A basic example is provided in `Example.js`, conditionally rendering one of two panels and updating an error label in the case of failure in the `onInit()` callback of the Interface. There are no restrictions on where or how you choose to implement.

## Testing

1. From your brand's page on Stacks, select or create a new product.

2. In the 'versions' tab, create a new version for testing. You can delete it later. Check the 'Use Stacks Auth' checkbox, and select HISE v2 from the version dropdown.

3. In the 'Files' tab of the new version modal, click the green 'Auth File' button. Click on the newly created file to expand it. You can add your other product files too, if you prefer to do a full test.

4. Set the Windows Path to `~\Music\StacksAppFiles\product-id.authfile` and the MacOS path to `~/Music/StacksAppFiles/product-id.authfile` (be sure to replace with your product id!)

5. Add the version.

6. Before exiting the versions tab, click the 'Add RSA Key' button and paste in your RSA private key (including the -----BEGIN RSA PRIVATE KEY----- and -----END RSA PRIVATE KEY----- parts). This value is stored securely in Stacks' servers. It can be updated at any time but cannot be read again after being set. We recommend retaining your own copy in a secure location only you and trusted brand members can access.

7. In the Stacks App, navigate to your product. As a manager of the product, you should see an option to add to your stack if you haven't already.

8. Download from the My Stack page.

9. Open your plugin. You should now pass the authentication check. Sometimes it may take up to a minute before the auth file is written. Stacks will continue to update it on a daily basis in the background, regardless of whether the app is open or not.
