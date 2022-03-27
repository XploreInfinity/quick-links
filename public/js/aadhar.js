$("document").ready(()=>{
    const aadhar_regexp=/^[0-9]{12}$/
    const otp_regexp=/^[0-9]{6}$/
    const err_lbl=$("#err_lbl") 
    //Hide the 2nd step(OTP verification step) until the first step completes...
    $(".step2").hide()

    //Events:
    $("#sendOTP_btn").on("click",async()=>{
        err_lbl.text("")
        let aadhar = $("#aadhar_tf").val()
        if(aadhar_regexp.test(aadhar)){
            try{
                let response=await axios.post("/aadharlink/aadhar",{aadhar:aadhar})
                $(".step1").hide()
                $("[for='otp']").text("Enter the OTP sent to your aadhar-linked phone number ("+response.data.mobile+")")
                $(".step2").show()
            }catch(error){
                err_lbl.text(error.response?error.response.data.error:"Failed to communicate with the server")
                console.log(error)
            }
        }
        else err_lbl.text("Please enter a valid aadhar")
    })

    $("#verifyOTP_btn").on("click",async()=>{
        err_lbl.text("")
        let otp = $("#otp_tf").val()
        if(otp_regexp.test(otp)){
            try {
                let response = await axios.post('/aadharlink/otp',{otp:otp})
                location.assign('/')
            } catch (error) {
                err_lbl.text(error.response?error.response.data.error:"Failed to communicate with the server")
                console.log(error)
            }
        }
        else err_lbl.text("Invalid OTP")
    })
})