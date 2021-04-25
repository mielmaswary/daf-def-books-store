



///////////////////////////////////////////general/////////////////////////////////////////////////////

//elements
const msgModal=document.getElementById('msg-modal')
const header=document.getElementsByClassName('header')[0]
const chooseOptions=document.getElementsByClassName('choose-options')[0]
let isEdit=true
//header
const mainSearchForm=document.getElementsByClassName('search-book')[0]
//login modals
const modalBackground=document.getElementById('modal-bg')
const loginForm=document.getElementById('login-form')
const loginErrorMsg=document.getElementById('login-error-msg')
let token=''
const mustLoggedInModal=document.getElementById('mustLoggedInModal')
const mustLoggedInButton=document.getElementById('mustLoggedInButton')
const books=document.getElementsByClassName('gallery-cell')


//books search modals
const booksSearchModalBg=document.getElementsByClassName('books-search-modal-bg')[0]
const booksSearchModal=booksSearchModalBg.getElementsByClassName('books-search-modal')[0]
const searchedBooksContainer=document.querySelector('#searched-books-container');
const booksSearchTitle=booksSearchModalBg.getElementsByClassName('section-title')[0]

//functions
const openMsgModal=(msg)=>{
    msgModal.classList.remove("display-none")
    msgModal.children[0].innerHTML=msg
}

const closeBooksSearchModalBg=()=>{
    booksSearchModalBg.classList.add('display-none')
}


///////////////////////////////////////////add book////////////////////////////////////////////////////

//elements
const addBookBtn=document.getElementById('book-add-btn')
const addBookPanelContainer=document.getElementById('book-add-panel-container')
const addBookPanel=document.getElementById('addBookPanel')
//events
addBookBtn.addEventListener('click',()=>{
    mainSearchForm.classList.add('display-none')
    openAddBookPanel()
    closeEditBookPanel()
    addBookBtn.disabled=true
    bookRemoveBtn.classList.remove('chosenOption')
    editBookBtn.classList.remove('chosenOption')
    addBookBtn.classList.add('chosenOption')
})

addBookPanel.addEventListener('submit',()=>{})



//functions
const openAddBookPanel=()=>{
    addBookPanelContainer.classList.remove('display-none')
    closeEditBookPanel()
    closeRemoveBookPanel()
    closeBooksSearchModalBg()
}

const closeAddBookPanel=()=>{
    addBookPanelContainer.classList.add('display-none')
}


addBookPanel.addEventListener('submit',(event)=>{
    event.preventDefault()
    const bookData=createObjData(event.target)
    addNewBook(bookData)
    openMsgModal('מברוק:)<br> הוספת ספר חדש לחנות!')
    setTimeout(()=>{
        location.reload();
    },1000)
})

//fetch
const addNewBook=(bookData)=>{
    token=localStorage.getItem('token')
    const url=`http://localhost:3000/books/add`
    const options={
        method: 'POST', 
        headers: {
           'Content-Type': 'application/json',
           'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(bookData)
    }
    fetch(url,options)
}



///////////////////////////////////////////edit book////////////////////////////////////////////////////

//elements
const editBookBtn=document.getElementById('book-edit-btn')
const editBookPanelContainer=document.getElementById('book-edit-panel-container')
const editBookPanel=document.getElementsByClassName('book-panel')[0]

//events
editBookBtn.addEventListener('click',()=>{
    isEdit=true
    openMainSearchForm()
    closeAddBookPanel()
    closeRemoveBookPanel()
    mainSearchForm.value=''
    editBookBtn.disabled=true

    bookRemoveBtn.classList.remove('chosenOption')
    editBookBtn.classList.add('chosenOption')
    addBookBtn.classList.remove('chosenOption')

})
editBookPanel.addEventListener('submit',(event)=>{
    event.preventDefault()
    const bookData=createObjData(event.target)
    updateBookDetailes(bookData,localStorage.getItem('edit-book-id'))
    openMsgModal('מצויין:)<br> כל הפרטים עודכנו!')
    setTimeout(()=>{
        location.reload();
    },1000)
    localStorage.removeItem('edit-book-id');


})


//functions
const openMainSearchForm=()=>{
    mainSearchForm.classList.remove('display-none')
}
const openEditBookPanel=(bookId)=>{
    editBookPanelContainer.classList.remove('display-none')
    restartInputValues()
    renderBookDetails(bookId)
    closeAddBookPanel()
    closeRemoveBookPanel()
    closeBooksSearchModalBg()
}
const restartInputValues=()=>{
    for (let child of editBookPanel.children){
        if(child.childElementCount>0 && child.children[1].tagName==='INPUT')
            child.children[1].value=''
     }
}

const closeEditBookPanel=()=>{
    editBookPanelContainer.classList.add('display-none')
}

const createObjData =(form)=>{
    const objData ={
        bookName:form[0].value,
        authorName: form[1].value,
        genres:form[2].value,
        pagesNum:form[3].value,
        imageUrl:form[4].value,
        price:form[5].value
    }
    for (let field in objData ){
        if(objData[field]==="" || objData[field]===undefined)
           delete objData[field]
    }

    return objData
}

const modalMsg=(msg)=>{
    
}
//fatch functions
const renderBooksImagesBySearch=(searchValue)=>{
    const url=`http://localhost:3000/books/${searchValue}`

    fetch(url).then((res)=>{
        if(res.ok){
           return res.json()
        }
        else{
            throw new Error(res.status)
        }
    }).then((jsonObj)=>{
       const seachedBooksUrl=jsonObj.map(img=>img.imageUrl)
       const searchedBooksId=jsonObj.map(img=>img._id)
       booksSearchTitle.innerHTML=seachedBooksUrl.length>0?'הנה ספרים שמתאימים לחיפוש שלך...':'לא מצאנו ספרים שמתאימים לחיפוש שלך...'
       while(searchedBooksContainer.children.length>0){
           searchedBooksContainer.removeChild(searchedBooksContainer.lastChild)
        }
       for(let i=0;i<seachedBooksUrl.length;i++){
           const galleryCell=document.createElement('div')
           galleryCell.className='book'
           searchedBooksContainer.appendChild(galleryCell)
           galleryCell.style.backgroundImage=`url(${seachedBooksUrl[i]})`
           galleryCell.id=searchedBooksId[i]
           galleryCell.addEventListener('click', ()=>{
               if(isEdit){
                 openEditBookPanel(galleryCell.id)
                 localStorage.setItem('edit-book-id',galleryCell.id)
               }
               else{
                 openRemoveBookPanel(galleryCell.id)
                 localStorage.setItem('remove-book-id',galleryCell.id)
               }
                  
               localStorage.setItem('edit-book-id',galleryCell.id)
               closeAddBookPanel()
               booksSearchModalBg.classList.add('display-none')
               mainSearchForm.value=''
           }) 
       }
    })  
}


const renderBookDetails=(bookId)=>{
    token=localStorage.getItem('token')
    const options={
        method: 'GET', 
        headers: {
           'Content-Type': 'application/json',
           'Authorization': `Bearer ${token}`
        }
    }
    fetch(`http://localhost:3000/books/get/${bookId}`,options)
    .then(res=>res.json())
    .then(book=>{
        console.log(book)
        removeBookName.innerHTML=book.bookName+'/ '+book.authorName
        currentBookName.innerHTML=book.bookName
        currentAuthorName.innerHTML=book.authorName
        currentGenre.innerHTML=book.genres
        currentPages.innerHTML=book.pagesNum
        // currentImg.innerHTML=book.imageUrl
        currentPrice.innerHTML=book.price
        
    }).catch(err=>{
        console.log(err)
    })
}

const updateBookDetailes=(bookData,bookId)=>{
    token=localStorage.getItem('token')
    const url=`http://localhost:3000/books/edit/${bookId}`
    const options={
        method: 'PATCH', 
        headers: {
           'Content-Type': 'application/json',
           'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(bookData)
    }
    fetch(url,options)
}


///////////////////////////////////////////remove book////////////////////////////////////////////////////

//elements

const bookRemovePanelContainer=document.getElementById('book-remove-panel-container')
const bookRemoveBtn=document.getElementById('book-remove-btn')
const removeBookName=document.getElementById('removeBookName')
const removeBookPanel=document.getElementById('removeBookPanel')

//events

bookRemoveBtn.addEventListener('click',()=>{
        isEdit=false
        openMainSearchForm()
        closeAddBookPanel()
        closeEditBookPanel()
        mainSearchForm.value=''
        bookRemoveBtn.disabled=true
        bookRemoveBtn.classList.add('chosenOption')
        editBookBtn.classList.remove('chosenOption')
        addBookBtn.classList.remove('chosenOption')
   })


//functions

const openRemoveBookPanel=(bookId)=>{
    bookRemovePanelContainer.classList.remove('display-none')
    // renderBookDetails(bookId)
    restartInputValues()
    renderBookDetails(bookId)
    closeBooksSearchModalBg()
    
}

const closeRemoveBookPanel=()=>{
    bookRemovePanelContainer.classList.add('display-none')
}

removeBookPanel.addEventListener('submit',(event)=>{
    event.preventDefault()
    deleteBook(localStorage.getItem('edit-book-id'))
    openMsgModal('מצויין:)<br> כל הפרטים עודכנו!')
    setTimeout(()=>{
        location.reload();
    },1000)
    localStorage.removeItem('edit-book-id');
})

//fetch functions
const deleteBook=(bookId)=>{
    token=localStorage.getItem('token')
    const url=`http://localhost:3000/books/remove/${bookId}`
    const options={
        method: 'POST', 
        headers: {
           'Content-Type': 'application/json',
           'Authorization': `Bearer ${token}`
        }    }
    fetch(url,options)
}




///////////////////////////////////////////////////

const renderBooksImagesById=()=>{
    token=localStorage.getItem('token')
    const options={
        method: 'GET', 
        headers: {
           'Content-Type': 'application/json',
           'Authorization': `Bearer ${token}`
        }
    }
    fetch(`http://localhost:3000/books/get-by-id`,options)
    .then(res=>res.json())
    .then(books=>{
        let totalPay=0
        const booksImgUrl=books.map(book=>book.imageUrl)
        while(purchasedBooksContainer.children.length>0){
            purchasedBooksContainer.removeChild(purchasedBooksContainer.lastChild)
         }
        for(let i=0;i<booksImgUrl.length;i++){
            const galleryCell=document.createElement('div')
            galleryCell.className='book'
            purchasedBooksContainer.appendChild(galleryCell)
            galleryCell.style.backgroundImage=`url(${booksImgUrl[i]})`
            galleryCell.id=books[i]._id
            const removeBtn=document.createElement('div')
            removeBtn.className='fas fa-times remove-book-btn'
            removeBtn.addEventListener('click',()=>{
               removeBookFromCart(removeBtn.parentElement.id)
            })
            galleryCell.appendChild(removeBtn)
            galleryCell.classList.add('position-relative')
            // galleryCell.id=searchedBooksId[i] 
            totalPay+=books[0].price
        }
        purchasedBooksCounter.innerHTML=booksImgUrl.length
        if(booksImgUrl.length===0)
            purchasedBooksCounter.classList.add('display-none')
        payBill.innerHTML=`סכום כולל לתשלום: ${totalPay} ש"ח`

    }).catch(err=>{
        console.log(err)
    })
}



const addUserToDB=(userData)=>{

   fetch('http://localhost:3000/users/add', {
       method: 'POST', 
       headers: {
          'Content-Type': 'application/json',
       },
       body: JSON.stringify(userData),
       })
       .then(response => response.json())
       .then(data=>{
           console.log(data.user.email,data.user.password)
       })
       .catch((err)=>{
       })
      
}

const loginAdmin= async (adminLoginData)=>{
    const options={
        method: 'POST', 
        headers: {
           'Content-Type': 'application/json',
        },
        body: JSON.stringify(adminLoginData)
    }
   fetch('http://localhost:3000/admin/login',options)
   .then(response => response.json())
   .then(data => {
    if(data.admin){
    
    }
    else{
        showLoginErrorMsg('נראה שלא הצלחת להתחבר...<br> אולי הסיסמא או המייל לא נכונים?')
     }
   })
   
}
const logout=()=>{
    token=localStorage.getItem('token')
    const options={
        method: 'POST', 
        headers: {
           'Authorization': `Bearer ${token}`
        }
    }
   fetch('http://localhost:3000/users/logout',options)
   .then(response => response.json())
   .then(data => {
       userLoggedinTools.classList.add('display-none')
       purchasedBooksCounter.classList.add('display-none')
       console.log(data)

    }).catch(error=>{
        console.log(error)
    })
}

const logoutAll=()=>{
    token=localStorage.getItem('token')
    const options={
        method: 'POST', 
        headers: {
           'Authorization': `Bearer ${token}`
        }
    }
   fetch('http://localhost:3000/users/logoutAll',options)
   .then(response => response.json())
   .then(data => {
       userLoggedinTools.classList.add('display-none')
       purchasedBooksCounter.classList.add('display-none')
       console.log(data)

    }).catch(error=>{
        console.log(error)
    })
}

////////////////////client functions//////////////////////

const closeModal=()=>{
    closeLoginModal()

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
    modalBackground.style.zIndex=5

    loginErrorMsg.classList.add('display-none')
    loginForm.classList.remove('display-none')
}
openLoginModal()


const closeLoginModal=()=>{
    modalBackground.classList.add('display-none')
    modalBackground.style.zIndex=-1
    loginForm.classList.add('display-none')
}


const openLoginForm=()=>{
    if(!window.matchMedia("(max-width: 800px)").matches)
         loginForm.style.transform='translateX(60%)'
    loginForm.classList.remove('display-none')
    loginErrorMsg.classList.add('display-none')
}
const closeLoginForm=()=>{
    if(!window.matchMedia("(max-width: 800px)").matches)
         loginForm.style.transform='translateX(-60%)'
    loginForm.classList.add('display-none')
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

const closeSearchBooksModal=()=>{
    booksSearchModalBg.classList.add('display-none')
}

const showLoginErrorMsg=(msg)=>{
   loginErrorMsg.innerHTML=msg
   loginErrorMsg.classList.remove('display-none')
}

mainSearchForm.classList.add('display-none')
mainSearchForm.addEventListener("keyup",(event)=>{
    let searchValue=mainSearchForm.value.trim()
    if(searchValue!=='' && event.key!=='Backspace')
       booksSearchModalBg.classList.remove('display-none')
    else
        searchValue='emptyValue'
    renderBooksImagesBySearch(searchValue)
})


//mouseover and keyup
const events=['mouseover','keyup']
for (let event of events){
    for (let form of modalBackground.children){
        form.addEventListener(event,()=>{
            if(isValidForm(form)){
                form.querySelector('button').classList.remove('disableSubmit')
                form.querySelector('button').classList.add('enableSubmit')

            }
            else{
             form.querySelector('button').classList.add('disableSubmit')
             form.querySelector('button').classList.remove('enableSubmit')
             form.disabled=true
            }
        })
     }
}


loginForm.addEventListener('submit',(event)=>{
    event.preventDefault()
    const adminLoginData={
        email:loginForm.email.value,
        password:loginForm.password.value
    }
    // loginAdmin(adminLoginData)
    chooseOptions.classList.remove('display-none')
    header.classList.remove('display-none')
    // token= localStorage.setItem('token',data.token)
    // console.log(data)
    closeModal()
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
