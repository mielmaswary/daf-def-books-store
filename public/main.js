///////////////////elements///////////////////////
//header
const utilsContainer=document.getElementsByClassName('utils-container')[0]
const headerLoginBtn=utilsContainer.getElementsByClassName('fa-user')[0]
const headerCartBtn=utilsContainer.getElementsByClassName('fa-shopping-cart')[0]
const headerMenuBtn=utilsContainer.getElementsByClassName('fa-bars')[0]



const recommendedsContainer =document.querySelector('#recommendeds')
const salesContainer =document.querySelector('#sales')
const newBooksContainer =document.querySelector('#new-books')
const footer=document.querySelector('#footer')
const footerDafdef=footer.getElementsByClassName('footer-daf-def')[0]
const footerGenres=footer.getElementsByClassName('footer-genres')[0]
const footerSales=footer.getElementsByClassName('footer-sales')[0]

//login modals
const modalBackground=document.getElementsByClassName('modal')[0]
const signupForm=modalBackground.children[0]
const loginForm=modalBackground.children[1]
const switchToSignUpBtn=document.querySelector('#switch-to-signup')
const switchToLoginBtn=document.querySelector('#switch-to-login')
const loginFormBtn=loginForm.getElementsByTagName('button')[0]
const signupFormBtn=signupForm.getElementsByTagName('button')[0]

//books modals
const booksInfoModal=document.getElementsByClassName('modal')[1]
const booksInfoBookName=document.getElementsByClassName('book-name')[0]
const booksInfoAuthorName=document.getElementsByClassName('author-name')[0]
const booksInfoBookImg=document.getElementsByClassName('info-img')[0]
const booksInfoBookPrice=document.getElementsByClassName('info-price')[0]
const booksInfoBookSummery=document.getElementsByClassName('summery')[0].querySelectorAll('p')[0]
const booksInfoBookPages=document.getElementsByClassName('summery')[0].querySelectorAll('p')[1]
const booksInfoBookGenre=document.getElementsByClassName('summery')[0].querySelectorAll('p')[2]
const books=document.getElementsByClassName('gallery-cell')
///////////////////server functions////////////////////

const renderImages=()=>{
    const url='http://localhost:3000/books/get-all'

    fetch(url).then((res)=>{
        if(res.ok){
           return res.json()
        }
        else{
            throw new Error(res.status)
        }
    }).then((jsonObj)=>{
       const recommendedsBooksUrl=jsonObj.filter(img=>img.recommended).map(img=>img.imageUrl)
       const recommendedsBooksId=jsonObj.filter(img=>img.recommended).map(img=>img._id)
       const recommendedsBooks=recommendedsContainer.getElementsByClassName('gallery-cell')

       const salesBooksUrl=jsonObj.filter(img=>img.sale).map(img=>img.imageUrl)
       const salesBooksId=jsonObj.filter(img=>img.sale).map(img=>img._id)
       const salesBooks=salesContainer.getElementsByClassName('gallery-cell')

       const newBooksUrl=jsonObj.filter(img=>img.new).map(img=>img.imageUrl)
       const newBooksId=jsonObj.filter(img=>img.new).map(img=>img._id)
       const newBooks=newBooksContainer.getElementsByClassName('gallery-cell')


       for(let i=0;i<recommendedsBooks.length;i++){
           recommendedsBooks[i].style.backgroundImage=`url(${recommendedsBooksUrl[i]})`
           recommendedsBooks[i].id=recommendedsBooksId[i]
           salesBooks[i].style.backgroundImage=`url(${salesBooksUrl[i]})`
           salesBooks[i].id=salesBooksId[i]
           newBooks[i].style.backgroundImage=`url(${newBooksUrl[i]})`
           newBooks[i].id=newBooksId[i]
       }
    
    })
    
}

const renderBookInfo=(book)=>{
    console.log(book.id)
     const url=`http://localhost:3000/books/get/${book.id}`
   
     fetch(url).then((res)=>{
        if(res.ok){
           return res.json()
        }
        else{
            throw new Error(res.status)
        }
    }).then((jsonObj)=>{
        booksInfoBookImg.style.backgroundImage=`url(${jsonObj.imageUrl})`;
        booksInfoBookName.innerHTML=jsonObj.bookName;
        booksInfoAuthorName.innerHTML=jsonObj.authorName;
        booksInfoBookPrice.innerHTML=`ספר דיגיטלי: ${jsonObj.price} ש"ח`;
        booksInfoBookPages.innerHTML= `מספר עמודים: ${jsonObj.pagesNum} `;
        booksInfoBookGenre.innerHTML=`ז'אנר: ${jsonObj.genres} `;
    })
}


const addUserToDB=(userData)=>{
    const data=userData

   fetch('http://localhost:3000/users/add', {
       method: 'POST', 
       headers: {
          'Content-Type': 'application/json',
       },
       body: JSON.stringify(data),
       })
       .then(()=>{
           console.log('ok')
       }).catch((err)=>{
           alert(err)
       })
}

const loginUser=(userLoginData)=>{
    const data=userLoginData

    fetch('http://localhost:3000/users/login', {
        method: 'POST', 
        headers: {
           'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        })
        .then(()=>{
            alert(`${data.email} has loged in!`)
            
        }).catch((err)=>{
            alert(err)
        })
    }

const logout=()=>{

}

////////////////////client functions//////////////////////

const closeModal=()=>{
    closeLoginModal()
    closeSignupModal()
    closeBooksModal()

    refreshFormsInputs()
}

const refreshFormsInputs =()=>{
    for (let form of modalBackground.children){
        for(let child of form){
          child.value=''
        }
    }
}
const openLoginModal=()=>{
    modalBackground.classList.remove('display-none')
    if(!window.matchMedia("(max-width: 500px)"))
        loginForm.style.transform='translateX(60%)'
    loginForm.classList.remove('display-none')
}

const closeLoginModal=()=>{
    modalBackground.classList.add('display-none')
    if(!window.matchMedia("(max-width: 500px)"))
        loginForm.style.transform='translateX(-60%)'
    loginForm.classList.add('display-none')
}

const openSignupModal=()=>{
    modalBackground.classList.remove('display-none')
    if(!window.matchMedia("(max-width: 500px)"))
        signupForm.style.transform='translateX(-50%)'
    signupForm.classList.remove('display-none')
}
const closeSignupModal=()=>{
    modalBackground.classList.add('display-none')
    if(!window.matchMedia("(max-width: 500px)"))
        signupForm.style.transform='translateX(50%)'
    signupForm.classList.add('display-none')
   
}
const closeBooksModal=()=>{
    booksInfoModal.classList.add('display-none')
}

const openLoginForm=()=>{
    if(!window.matchMedia("(max-width: 500px)"))
         loginForm.style.transform='translateX(60%)'
    loginForm.classList.remove('display-none')
}
const closeLoginForm=()=>{
    if(!window.matchMedia("(max-width: 500px)"))
         loginForm.style.transform='translateX(-60%)'
    loginForm.classList.add('display-none')
}
const openSignupForm=()=>{
    if(!window.matchMedia("(max-width: 500px)"))
         signupForm.style.transform='translateX(-50%)'
    signupForm.classList.remove('display-none')
}
const closeSignupForm=()=>{
    if(!window.matchMedia("(max-width: 500px)"))
         signupForm.style.transform='translateX(50%)'
    signupForm.classList.add('display-none')

}

const swichToLogin=()=>{
    openLoginForm()
    closeSignupForm()
}
const swichToSignup=()=>{
    openSignupForm()
    closeLoginForm()
}



const isValidAge=(age)=>{
    return age>12&&age!=''
}
const isValidEmail =(email)=>{
   return true
}
const isValidPassword=(password)=>{
    return true
}

const isValidForm=(form)=>{
    if(form.email&&form.password){
        return  isValidEmail(form.email.value)&&isValidPassword(form.password.value)
    }
    else{
        return false
    }
   
}

// const rslides=()=>{
//     let slides=document.getElementsByClassName('rslides')[0]
//     slides.responsiveSlides()
//  }
//  rslides()

// //  $(function() {
// //     $(".rslides").responsiveSlides();
// //   });



//////////////////eventListeners//////////////////

switchToSignUpBtn.addEventListener('click', swichToSignup)
switchToLoginBtn.addEventListener('click',swichToLogin)


headerLoginBtn.addEventListener('click',openLoginModal)
window.addEventListener('click' ,(event)=> {
    if (event.target===modalBackground|| event.target===booksInfoModal || event.target.className==="fas fa-times")
        closeModal()
  })

loginForm.addEventListener('submit',(event)=>{
    event.getPreventDefault
    
})

//mouseover and keyup
const events=['mouseover','keyup']
for (let event of events){
    for (let form of modalBackground.children){
        form.addEventListener(event,()=>{
            if(isValidForm(form)){
                form.querySelector('button').classList.remove('disableSubmit')
                form.querySelector('button').classList.add('enableSubmit')
                signupFormBtn.disabled=false

            }
            else{
             form.querySelector('button').classList.add('disableSubmit')
             form.querySelector('button').classList.remove('enableSubmit')
             form.disabled=true
            }
        })
     }
}


//blur
signupForm.name.addEventListener('blur', ()=>{
   if(!signupForm.name.value.length>0){
     signupForm.name.value='נא כתבו את שמכם...'
     signupForm.name.classList.add('warning')
   }
})
signupForm.age.addEventListener('blur', ()=>{
    if(!signupForm.age.value.length>0){
        signupForm.age.value='נא ציינו את גילכם...'
        signupForm.age.classList.add('warning')
    }
    else if(signupForm.age.value<=12){
        signupForm.age.classList.add('warning')
        signupForm.age.value='הרשמה אפשרית מעל גיל 12...'
    }
 })


 //focus
 for(let child of signupForm){
     child.addEventListener('focus',()=>{
         child.value=''
         child.classList.remove('warning')
     })
 }




signupForm.addEventListener('submit',(event)=>{
    event.getPreventDefault
    const userData={
        name:signupForm.name.value,
        age:signupForm.age.value,
        email:signupForm.email.value,
        password:signupForm.password.value
    }

    addUserToDB(userData)
        
})


loginForm.addEventListener('submit',(event)=>{
    event.getPreventDefault
    const userLoginData={
        email:loginForm.email.value,
        password:loginForm.password.value
    }
    loginUser(userLoginData)
})

for (let book of books)
{
    book.addEventListener('click',()=>{
        renderBookInfo(book)
        setTimeout(() => {
            booksInfoModal.classList.remove('display-none')

        }, 400);
    })
}

///////on load
signupFormBtn.disabled=true
// loginFormBtn.disabled=true
renderImages()
