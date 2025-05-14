namespace StacksAuth {
	reg OS = Engine.getOS();
	reg filePath;
	reg homeDir;
	reg authFile;
	reg authFileContents;
	reg reversedDecryptedString;
	reg decryptedString;	
	reg jsonPayload;
	reg lastErrorCode;
	
	const var stacksProductId = "YOUR-PRODUCT-ID-HERE";
	const var publicKey = "YOUR-PUBLIC-KEY-HERE";

	 inline function authenticate(){ 
	 	lastErrorCode = null;
	 	
		homeDir = FileSystem.getFolder(FileSystem.UserHome).toString(0);
		if (OS == "WIN"){
			filePath = homeDir + "\\Music\\StacksAppFiles\\" + stacksProductId + ".authfile";
		} else {
			filePath = homeDir + "//Music//StacksAppFiles//" + stacksProductId + ".authfile";
		}
		
		authFile = FileSystem.fromAbsolutePath(filePath);
		if (!authFile.isFile()){
			// error code 1: FileNotFound
			lastErrorCode = "FileNotFound";
			return false;
		}
		
		authFileContents = authFile.loadAsString();
		
		// For whatever reason, this function returns the decrypted payload reversed
		reversedDecryptedString = FileSystem.decryptWithRSA(authFileContents,  publicKey);
		
		decryptedString = "";
		for (i = reversedDecryptedString.length-1; i> -1; i--)
			{
				decryptedString += reversedDecryptedString.charAt(i);
			}

		jsonPayload = decryptedString.parseAsJSON();

		if (jsonPayload == null) {
			// error code 2: DecryptionFailed
			lastErrorCode = "DecryptionFailed";
			return false;
		}

		if (jsonPayload.exp == null || typeof jsonPayload.exp != "number"){
			// error code 3: InvalidDate
			lastErrorCode = "InvalidDate";
			return false;
		}
		
		
		if (Date.getSystemTimeMs() >= jsonPayload.exp) {
			// error code 4: LicenseExpired
			lastErrorCode = "LicenseExpired";
			return false;
		}
		
		if (jsonPayload.deviceId != FileSystem.getSystemId()){
			// error code 5: Mismatched device id
			lastErrorCode = "MismatchedDeviceID";
			return false;
		}
		
		return true;
	}
	
	inline function getLastErrorMessage(){
		switch (lastErrorCode){
			case null:
				return "No Stacks Auth error.";
			case "FileNotFound": 
				return "Stacks Auth license file could not be found.";
			case "DecryptionFailed":
				return "Stacks Auth license file decryption failed.";
			case "InvalidDate":
				return "Invalid date format in Stacks Auth license.";
			case "LicenseExpired":
				return "Stacks Auth license has expired.";
			case "MismatchedDeviceID":
				return "Device ID does not match Stacks Auth license.";
			default:
				return "Unknown Stacks Auth error."
		}
			
	}
}