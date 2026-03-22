window.onload = function() {
    renderStudents();
};

function renderStudents() {
    let ul = document.querySelector("ul");
    ul.innerHTML = ""; 
    
    let listStudents = JSON.parse(localStorage.getItem("students")) || [];

    listStudents.forEach((student, index) => {
        let li = document.createElement("li");
        li.className = "student-card";
        
        // إظهار جميع المعلومات داخل البطاقة
        li.innerHTML = `
            <div class="card-header">
                <h3>${student.nom}</h3>
                <span class="badge">${student.cat}</span>
            </div>
            <div class="card-body">
                <p><strong>التخصص:</strong> ${student.sp}</p>
                <p><strong>تاريخ البداية:</strong> ${student.date_f}</p>
                <p><strong>تاريخ النهاية:</strong> ${student.date_s}</p>
                <p><strong>رقم المتدرب:</strong> ${student.nemero}</p>
            </div>
            <div class="actions">
                <button class="edit-btn" onclick="editStudent(${index})">تعديل الكل</button>
                <button class="delete-btn" onclick="deleteStudent(${index})">حذف</button>
            </div>
        `;
        ul.append(li);
    });
}

function editStudent(index) {
    let listStudents = JSON.parse(localStorage.getItem("students")) || [];
    let s = listStudents[index];

    // طلب تعديل كل معلومة على حدة
    let nNom = prompt("تعديل الاسم:", s.nom);
    let nSp = prompt("تعديل التخصص:", s.sp);
    let nCat = prompt("تعديل الفئة:", s.cat);
    let nDf = prompt("تعديل تاريخ البداية:", s.date_f);
    let nDs = prompt("تعديل تاريخ النهاية:", s.date_s);
    let nNum = prompt("تعديل الرقم:", s.nemero);

    // التأكد من أن المستخدم لم يضغط Cancel
    if (nNom !== null && nSp !== null && nCat !== null) {
        listStudents[index] = {
            nom: nNom,
            sp: nSp,
            cat: nCat,
            date_f: nDf,
            date_s: nDs,
            nemero: nNum
        };
        localStorage.setItem("students", JSON.stringify(listStudents));
        renderStudents();
    }
}

function deleteStudent(index) {
    if (confirm("هل تريد حذف هذا المتدرب؟")) {
        let listStudents = JSON.parse(localStorage.getItem("students")) || [];
        listStudents.splice(index, 1);
        localStorage.setItem("students", JSON.stringify(listStudents));
        renderStudents();
    }
}

// دالة البحث
function searchData() {
    let filter = document.getElementById("searchInput").value.toLowerCase();
    let cards = document.querySelectorAll(".student-card");
    cards.forEach(card => {
        card.style.display = card.innerText.toLowerCase().includes(filter) ? "" : "none";
    });
}
function downloadCSV() {
    let listStudents = JSON.parse(localStorage.getItem("students")) || [];
    
    if (listStudents.length === 0) {
        alert("لا توجد بيانات لتصديرها!");
        return;
    }

    // 1. إعداد رؤوس الأعمدة
    let csvContent = "\ufeff"; // إضافة BOM لدعم اللغة العربية في Excel
    csvContent += "الاسم,التخصص,الفئة,تاريخ البداية,تاريخ النهاية,الرقم\n";

    // 2. إضافة البيانات
    listStudents.forEach(s => {
        let row = `${s.nom},${s.sp},${s.cat},${s.date_f},${s.date_s},${s.nemero}`;
        csvContent += row + "\n";
    });

    // 3. إنشاء ملف للتحميل
    let blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    let url = URL.createObjectURL(blob);
    let link = document.createElement("a");
    
    link.setAttribute("href", url);
    link.setAttribute("download", "students_data.csv");
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
function downloadJSON() {
    let listStudents = localStorage.getItem("students");
    if (!listStudents) return alert("القائمة فارغة!");

    let blob = new Blob([listStudents], { type: "application/json" });
    let url = URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.href = url;
    a.download = "backup_students.json";
    a.click();
}
// 1. دالة لتحويل البيانات الحالية إلى ملف JSON وتحميله
function downloadJSON() {
    let listStudents = localStorage.getItem("students");
    if (!listStudents || listStudents === "[]") {
        alert("لا توجد بيانات لحفظها!");
        return;
    }

    let blob = new Blob([listStudents], { type: "application/json" });
    let url = URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.href = url;
    a.download = "students_backup.json"; // اسم الملف الذي سيتم حفظه
    a.click();
}

// 2. دالة لقراءة الملف المرفوع وإعادة البيانات إلى LocalStorage
function importJSON(event) {
    let file = event.target.files[0];
    if (!file) return;

    let reader = new FileReader();
    reader.onload = function(e) {
        try {
            let data = JSON.parse(e.target.result);
            
            // التأكد من أن الملف يحتوي على مصفوفة بيانات
            if (Array.isArray(data)) {
                if (confirm("هل أنت متأكد؟ سيتم مسح البيانات الحالية وتعويضها ببيانات الملف.")) {
                    localStorage.setItem("students", JSON.stringify(data));
                    renderStudents(); // إعادة رسم القائمة بالبيانات الجديدة
                    alert("تمت استعادة البيانات بنجاح!");
                }
            } else {
                alert("الملف غير صحيح!");
            }
        } catch (error) {
            alert("حدث خطأ أثناء قراءة الملف!");
        }
    };
    reader.readAsText(file);
}