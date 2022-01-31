
let userFormDOM = document.querySelector('#userForm'); // id'si userForm olan Form

let inputDOM = document.querySelector('#task');// id'si task olan input

let ullistDOM = document.getElementsByTagName("li"); // li elementlerini ullistDOM altında topladım

let ulDOM = document.querySelector('#list'); // id'si list olan ul



function check(){
    this.classList.toggle("checked"); 
  }
  function removeButton(){
    this.parentElement.remove(); 
  }

const alertDOM = document.querySelector('#alert') 
const alertFunction = (title, message, className= "danger") =>  `<div class="alert alert-${className} alert-dismissible fade show" role="alert">
<strong> ${title} </strong> ${message}
<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>`
const alertFunction2 = (title, message, className= "success") =>  `<div class="alert alert-${className} alert-dismissible fade show" role="alert">
<strong> ${title} </strong> ${message}
<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>`

userFormDOM.addEventListener('submit', formHandler); // form submit edildiğinde formHandler fonksiyonunu çalıştır

function formHandler(event) {
    event.preventDefault()
    const inputDOM = document.querySelector('#task')
    submitOK = "true";

    if (inputDOM.value.length < 5) {  // 5 karakter altında, "boş bıraktınız" hatasını verecek
        alertDOM.innerHTML = alertFunction("Listeyi boş veya eksik bırakmazsın :)", "(Başarısız İşlem!)")
        submitOK = "false";
    }

    if (submitOK == "false") { // işlem false ise buradan ilerlemeyecek!
        return false; 
     }

     if (inputDOM.value){ 
        addItem(inputDOM.value) // boş şekilde gönder tuşuna bastığımda boş kutular olmayacak 
        inputDOM.value = "" // bilgileri girip gönder dediğim anda input kutusu sıfırlanacak
        alertDOM.innerHTML = alertFunction2("Listeye eklendi!", "(Başarılı işlem!)")
    } 
}

const addItem  = (inputDOM) => {  // yeni liste eklemek için

    let liDOM = document.createElement('li') 
    liDOM.innerHTML = `${inputDOM}` // yeni liste; id'si "task" olan input'da yazılanları listeleyecek, yani inputDOM'u
    ulDOM.append(liDOM) // listenin aşağısına eklenecekler

    liDOM.onclick = check; // sonradan eklenen listelerin silinmesi için aynı işlemi aşağıya uyguluyorum
        
    let closeButton = document.createElement("span");
        closeButton.classList.add("fas", "fa-times",  "float-right", "mr-0", "mt-1", "mb-1", "xmark"); // liDOM'a çarpıyı ekledim
        closeButton.onclick = removeButton;
         liDOM.append(closeButton);

     localStorage.setItem(`${ullistDOM.length}`, inputDOM);
}

for(let i=0; i < ullistDOM.length;i++){  
    let closeButton = document.createElement("span"); 
    closeButton.classList.add("fas", "fa-times",  "float-right", "mr-0", "mt-1", "mb-1", "xmark"); 
    closeButton.onclick = removeButton; 
    ullistDOM[i].append(closeButton); 
    ullistDOM[i].onclick = check; 
}

// Local storage'da mevcut olanları ekrana getirdim
for (let i = 0; i < localStorage.length; i++){
    let liDOM = document.createElement('li') 
    liDOM.innerHTML = `${localStorage.getItem(localStorage.key(i))}` 
    ulDOM.append(liDOM) 

    liDOM.onclick = check;
        
    let closeButton = document.createElement("span");
        closeButton.classList.add("fas", "fa-times",  "float-right", "mr-0", "mt-1", "mb-1", "xmark");
        closeButton.onclick = removeButton;
         liDOM.append(closeButton);
}