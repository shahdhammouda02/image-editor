// اول اشي نمسك الفلاتر اللي هي inputs
let saturate=document.getElementById('saturate');
let contrast=document.getElementById('contrast');
let brightness=document.getElementById('brightness');
let sepia=document.getElementById('sepia');
let grayscale=document.getElementById('grayscale');
let blur=document.getElementById('blur');
let hueRotate=document.getElementById('hue-rotate');
let upload=document.getElementById('upload');
let download=document.getElementById('download');
let img=document.getElementById('img');
let reset=document.querySelector('span');
let imgBox=document.querySelector('.img-box'); // امسك divاللي فيه الصورة
const canvas=document.getElementById('canvas');
// canvas ياخد اطار من نوع context
const ctx=canvas.getContext('2d'); // اطار للكانفس وبنحط ايش نوع الرسمة
// هذه الصورة بتظهر لما بعمل upload.onchange يعني بترفع عندك صورة لما (img.src=file.result;)

function resetValue(){
    img.style.filter='none'; // بتنشال الفلترز عن الصورة لكن بتضل القيم تعت الفلترز موجودة
    saturate.value='100';
    contrast.value='100';
    brightness.value='100';
    sepia.value='0';
    grayscale.value='0';
    blur.value='0';
    hueRotate.value='0';
}
window.onload=function(){
    download.style.display='none';//بالبداية فش صورة ف بالتالي ما بنقدر نعمل تحميل 
    reset.style.display='none';//نفس الشي بالبداية بقدرش اعمل استرجاع لانه فش صورة
    imgBox.style.display='none'; // وايضا بخفي المكان تبع الصورة بالبداية فش صورة
}
upload.onchange=function(){
    resetValue(); // نشغلها اول ما اختار صورة جديدة يعني ما بتخلي تاثير الصورة السابقة ييجي ع الجديدة
    // اول ما اضيف صورة ببدا اظهر اللي خفيتهم
    download.style.display='block';
    reset.style.display='block';
    imgBox.style.display='block';
// بدنا نظهر الصورة ف بنحتاج من الجافا سكربت تقرا الصورة
    let file=new FileReader(); // عبارة عن كلاس بيقرا الملفات
    // يعني لو رفعت اي ملف بنحط في الارري اللي اسمها files حسب index[0]
    file.readAsDataURL(upload.files[0]); // يقرا الملف من خلال الupload لما اعمل
    file.onload=function(){ // لما تحمل الصورة نفذ 
        img.src=file.result; // نحط النتيجة اللي جاية من قراءة الملف 
    }
    img.onload=function(){
        canvas.width=img.width;
        canvas.height=img.height;
        ctx.drawImage(img,0,0,canvas.width,canvas.height);
        img.style.display='none';
    }
}
// filters
// saturate.addEventListener("input",function(){
//     saturate.style.filter=`saturate(${saturate.value}%)`; // المشكلة بهذه الطريقة انه اي حركة بعملها ع فلتر تاني بتلغي اللي قبلها 
// })
// contrast.addEventListener("input",function(){
//     contrast.style.filter=`constrast(${contrast.value}%)`; // المشكلة بهذه الطريقة انه اي حركة بعملها ع فلتر تاني بتلغي اللي قبلها 
// })

let filters=document.querySelectorAll('ul li input'); // مسكت كل الفلاتر
filters.forEach(filter=>{
    filter.addEventListener('input',function(){
        // img.style.filter=`
        ctx.filter=`
        saturate(${saturate.value}%)
        contrast(${contrast.value}%)
        brightness(${brightness.value}%)
        sepia(${sepia.value}%)
        grayscale(${grayscale.value})
        blur(${blur.value}px)
        hue-rotate(${hueRotate.value}deg)
        `
    ctx.drawImage(img,0,0,canvas.width,canvas.height);
    })
})

// download
download.onclick=function(){
    // download.href=img.src; // بتحمل الصورة لكن بدون الفلاتر (المشكلة) لان اللغة لا تدعم ان يتم تحميل الصورة بالفلاتر
    // الحل انه بنعمل canvas بقدر يحمل الفلاتر فيه
    // يعني باخد نسخة من img وبحطها بالcanvas
    // لذلك بنحمل canvas
    download.href=canvas.toDataURL('image/jpg'); // png is default
}