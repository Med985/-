function done(){
let username = document.getElementById("username").value;
let password = document.getElementById("password").value;
const display = document.getElementById("p");
if(username === "fadila" && password === "med"){
    display.innerHTML = "تم تسجيل الدخول بنجاح";
    display.style.color = "green";
    display.style.fontSize = "20px";
    setTimeout(() => {
    location.href = "stage_page.html";}, 800);
}
else if(username === "med" && password === "med1"){
    display.innerHTML = "تم تسجيل الدخول بنجاح";
    display.style.color = "green";
    display.style.fontSize = "20px";
    location.href = "stage_page.html";
    setTimeout(() => {
        location.href = "stage_page.html";
    }, 800);
}
else{
    display.innerHTML = "اسم المستخدم أو كلمة المرور غير صحيحة";
    display.style.color = "red";
    display.style.fontSize = "20px";
}
}
