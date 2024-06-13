
        // // pages all 
        // document.querySelectorAll(".admin-btn").forEach((adminBtn,item1)=>{
        //     adminBtn.addEventListener("click",()=>{
        //         document.querySelectorAll(".admim-pages").forEach((adminPage,item2)=>{
        //             if(item1 == item2){
        //                 adminBtn.classList.add("active")
        //             }
        //         })
        //     })
        // })
        // edit user 
        document.querySelectorAll(".user-page .cate-btm tr").forEach(elem=>{
            elem.addEventListener("click",(event)=>{
                if(event.target.classList[1] == "cate-edit"){
                    document.querySelector(".name-input").value = elem.querySelector(".user-page .name").textContent
                    document.querySelector(".email-input").value = elem.querySelector(".user-page .email").textContent
                    document.querySelector(".phone-input").value = elem.querySelector(".user-page .phone").textContent
                    document.querySelector(".user-id-form").action = `/update/${elem.dataset.id}`
                    document.querySelector(".user-form").style.display = "flex"
                }
            })
        })
        // edit artist 
        document.querySelectorAll(".arti-page .cate-btm tr").forEach(elem=>{
            elem.addEventListener("click",(event)=>{
                if(event.target.classList[1] == "cate-edit"){
                    document.querySelector(".artist-f-ac").action = `/artist-update/${elem.dataset.id}`
                    document.querySelectorAll(".artist-f-ac .arti-input").forEach(art=>{
                        art.value += elem.querySelector(".arti-page .art-name").textContent
                    })
                    document.querySelector(".artist-f-ac .select-title").textContent = elem.querySelector(".arti-page .img img").src
                    document.querySelector(".arti-form").style.display = "flex"
                }
            })
        })
        // edit song 
        document.querySelectorAll(".song-page .cate-btm tr").forEach(elem=>{
            elem.addEventListener("click",(event)=>{
                if(event.target.classList[1] == "cate-edit"){
                    document.querySelector(".song-f-ac").action = `/song-update/${elem.dataset.id}`
                    document.querySelector(".song-f-ac h3").textContent = `Update song`
                    document.querySelector(".song-audio").src = elem.dataset.url
                    document.querySelector(".song-input-title").value = elem.querySelector(".song-name").textContent
                    document.querySelector(".song-img-select").textContent = elem.querySelector(".song-img img").src
                    document.querySelector(".artist-input-name").value = elem.querySelector(".artist-name").textContent
                    document.querySelector(".song-form").style.display = "flex"
                }
            })
        })
        // edit album 
        document.querySelectorAll(".album-page .cate-btm tr").forEach(elem=>{
            elem.addEventListener("click",(event)=>{
                if(event.target.classList[1] == "cate-edit"){
                    document.querySelector(".album-f-ac").action = `/album-update/${elem.dataset.id}`
                    document.querySelector(".album-input").value = elem.querySelector(".album-page .album-name").textContent
                    document.querySelector(".arti-name-input").value = elem.querySelector(".album-page .artist-name").textContent
                    document.querySelector(".album-select").textContent = elem.querySelector(".album-page .album-img img").src
                    document.querySelector(".album-form").style.display = "flex"
                }
            })
        })
        // select files 
        document.querySelectorAll(".select-btn").forEach((sele,item1)=>{
            sele.addEventListener("click",()=>{
                document.querySelectorAll(".select-input").forEach((inpu,item2)=>{
                    if(item1 == item2){
                        inpu.click()
                    }
                })
            })
        })
        document.querySelectorAll(".select-input").forEach((inpu,item1)=>{
            inpu.addEventListener("change",()=>{
                document.querySelectorAll(".select-title").forEach((titl,item2)=>{
                    if(item1 == item2){
                        titl.innerHTML = inpu.files[0].name
                        document.querySelector(".song-audio").src = URL.createObjectURL(inpu.files[0])
                        document.querySelector(".song-input-title").value = inpu.files[0].name
                    }
                })
            })
        })
