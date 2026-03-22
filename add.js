function add() {
    // تصحيح: استخدام # للوصول لـ ID أو تحديد العناصر بشكل صحيح
    let nom = document.getElementById("n1");
    let date_f = document.getElementById("n2");
    let sp = document.getElementById("n3");
    let cat = document.getElementById("n4");
    let date_s = document.getElementById("n5");
    let nemero = document.getElementById("n6");

    if (nom.value.length > 0 && date_f.value.length > 0 && sp.value.length > 0) {
        
        let all = {
            nom: nom.value,
            date_f: date_f.value,
            sp: sp.value,
            cat: cat.value,
            date_s: date_s.value,
            nemero: nemero.value
        };

        // 1. جلب البيانات القديمة من التخزين أو إنشاء مصفوفة فارغة
        let listStudents = JSON.parse(localStorage.getItem("students")) || [];

        // 2. إضافة الكائن الجديد للمصفوفة
        listStudents.push(all);

        // 3. حفظ المصفوفة المحدثة في الـ LocalStorage
        localStorage.setItem("students", JSON.stringify(listStudents));

        document.getElementById("p").innerHTML = "تم الحفظ بنجاح! انتقل لصفحة القائمة.";
        document.getElementById("p").style.color = "green";
        
        // اختيار اختياري: مسح الخانات بعد الإضافة
        nom.value = ""; date_f.value = ""; // إلخ...
    } else {
        document.getElementById("p").innerHTML = "أدخل المعلومات كاملة";
        document.getElementById("p").style.color = "red";
    }
}