# HISE Stacks Auth

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

There are two ways to test your Stacks Auth integration:

### Testing without a Stacks Account

If your product has not been published to Stacks, you can mimic the behavior of the Stacks licenser with the following steps:

1. Get the value of HISE's `FileSystem.getSystemId()` method on the device being used for testing.

2. Run `test.js` as a node script with the `deviceId` variable changed to the value derived from step 1 and the `privateKey` variable changed to your private RSA key.

   - You can do this by navigating to the file's parent directory in a terminal window and running `node test.js`.

3. Create a file called `product-id.authfile` (where `product-id` is the product id you provided in `StacksAuth.js`) inside of `/Users/username/Music/StacksAppFiles/` on MacOS or `C:\Users\username\Music\StacksAppFiles\` on Windows.

4. Paste the console output of step 2 into the new file and save.

5. You should now pass the authentication check.

### Testing with a Stacks Account

If you're already set up your brand on Stacks, you can test like so:

1. From your brand's page, select or create a new product.

2. In the 'versions' tab, create a new version for testing. You can delete it later. Check the 'Use Stacks Auth' checkbox, and select HISE v2 from the version dropdown.

3. In the 'Files' tab of the new version modal, click the green 'Auth File' button. Click on the newly created file to expand it. You can add your other product files too, if you prefer to do a full test.

4. Set the Windows Path to `~\Music\StacksAppFiles\product-id.authfile` and the MacOS path to `~/Music/StacksAppFiles/product-id.authfile` (be sure to replace with your product id!)

5. Add the version.

6. In the Stacks App, navigate to your product. As a manager of the product, you should see an option to add to your stack if you haven't already.

7. Download from the My Stack page.

8. Open your plugin. You should now pass the authentication check. Sometimes it may take up to a minute before the auth file is written. Stacks will continue to update it on a daily basis in the background, regardless of whether the app is open or not.
