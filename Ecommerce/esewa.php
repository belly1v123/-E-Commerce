<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Esewa Payment</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/crypto-js.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/hmac-sha256.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/enc-base64.min.js"></script>
</head>
<body>
   <?php
   @include 'config.php';
   ?>
   <?php
   @include 'setting.php';
   $select_cart = mysqli_query($conn,"SELECT * from cart");
         $grand_total = 0;
         if(mysqli_num_rows($select_cart) > 0) {
            while($fetch_cart = mysqli_fetch_assoc($select_cart)) {
               $sub_total = $fetch_cart['price'] * $fetch_cart['quantity'];
               $grand_total += $sub_total;
            }
         }
         $tax_amt = $grand_total*(13/100);
   ?>
    <h1>Esewa Payment</h1>
    <form action="<?php echo $epay_url?>" method="POST">
        <label for="amount">Amount:</label>
    <!-- <input type="text" id="amount" name="amount" value="100" required>
    <label>Tax Amount:</label>
    <input type="text" id="tax_amount" name="tax_amount" value ="1000" required>
    <label>Total Amount:</label>
    <input type="text" id="total_amount" name="total_amount" value="1100" required>
    <label for="transaction_uuid">Transaction UUID:</label>
    <input type="text" id="transaction_uuid" name="transaction_uuid"required>
    <label>Product Code:</label>
    <input type="text" id="product_code" name="product_code" value ="EPAYTEST" required>
    <label>Product Service Charge:</label>
    <input type="text" id="product_service_charge" name="product_service_charge" value="0" required>
    <label>Product Delivery Charge:</label>
    <input type="text" id="product_delivery_charge" name="product_delivery_charge" value="0" required>
    <label>Success URL:</label>
    <input type="text" id="success_url" name="success_url" value="https://esewa.com.np" required>
    <label>Failure URL:</label>
    <input type="text" id="failure_url" name="failure_url" value="https://google.com" required>
    <label>Signed_field_names:</label>
    <input type="text" id="signed_field_names" name="signed_field_names" value="total_amount,transaction_uuid,product_code" required>
    <label>Signature:</label>
    <input type="text" id="signature" name="signature" " required>
    <input value="Pay With Esewa" type="submit" style="background-color:green;color:white;"> -->
    <input type="hidden" id="amount" name="amount" value="<?php echo $grand_total?>" required>
    <input type="hidden" id="tax_amount" name="tax_amount" value ="<?php echo $tax_amt?>" required>
    
    <input type="text" id="total_amount" name="total_amount" value="<?php echo $grand_total + $tax_amt + 0 + 0?>" required>
   
    <input type="hidden" id="transaction_uuid" name="transaction_uuid"required>
    
    <input type="hidden" id="product_code" name="product_code" value ="EPAYTEST" required>
    
    <input type="hidden" id="product_service_charge" name="product_service_charge" value="0" required>
    
    <input type="hidden" id="product_delivery_charge" name="product_delivery_charge" value="0" required>
    
    <input type="hidden" id="success_url" name="success_url" value="https://esewa.com.np" required>
    
    <input type="hidden" id="failure_url" name="failure_url" value="https://google.com" required>
    
    <input type="hidden" id="signed_field_names" name="signed_field_names" value="total_amount,transaction_uuid,product_code" required>
  
    <input type="hidden" id="signature" name="signature"  required>
    <input value="Pay With Esewa" type="submit" style="background-color:green;color:white;">
    </form>
    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/crypto-js.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/hmac-sha256.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/enc-base64.min.js"></script> -->
    <script>
        function generateSignature() {
            // Generate transaction UUID
            var currentTime = new Date();
            var formattedTime = currentTime.toISOString().slice(2, 10).replace(/-/g, '') + '-' + currentTime.getHours() + currentTime.getMinutes() + currentTime.getSeconds();
            document.getElementById("transaction_uuid").value = formattedTime;
            
            // Retrieve payment details
            var total_amount = document.getElementById("total_amount").value;
            var transaction_uuid = document.getElementById("transaction_uuid").value;
            var product_code = document.getElementById("product_code").value;
            var secret = "8gBm/:&EnhH.1/q"; // Replace with your actual secret key
            
            // Generate signature
            var hash = CryptoJS.HmacSHA256(`total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`, secret);
            var hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
            document.getElementById("signature").value = hashInBase64;
        }
      // Call generateSignature() when input fields are changed
      //   document.getElementById("total_amount").addEventListener("input", generateSignature);
      //   document.getElementById("transaction_uuid").addEventListener("input", generateSignature);
      //   document.getElementById("product_code").addEventListener("input", generateSignature);
      generateSignature();
    </script>
</body>
</html>