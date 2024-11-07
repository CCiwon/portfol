const categories = document.querySelector('.categories')
const projectContainer = document.querySelector('.projects')
const projects = document.querySelectorAll('.project')


categories.addEventListener('click',(e) => {
    const filter = e.target.dataset.category // target 해당 요소가 발생한 곳
    console.log(filter)
    if(filter == null){
        return;
    }
    activeSelection(e.target)
    filterProjects(filter)

})   
//dataset.type
function activeSelection(target){
    const active = document.querySelector('.category--selected')
    active.classList.remove('category--selected')
    target.classList.add('category--selected')

}
function filterProjects(filter){
    projects.forEach((project) =>{
        if(filter == 'all' || filter === project.dataset.type){
            project.style.display = 'block'
        }
        else{
            project.style.display = 'none'
        }

    })
    projectContainer.classList.add('anim-out')
    setTimeout(() =>{
        projectContainer.classList.remove('anim-out')
    },300)
}

