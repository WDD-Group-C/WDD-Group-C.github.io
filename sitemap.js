document.addEventListener('DOMContentLoaded', () => {
    const nodes = document.querySelectorAll('.node');
    nodes.forEach(node => {
        node.addEventListener('click', () => {
            const link = node.getAttribute('data-link');
            if(link){
                window.location.href = link; //navigate to the lnk if it is added to the attribute
            }
        });
        node.addEventListener('mouseenter', () => {
            node.querySelector('rect').setAttribute('fill', 'white');
        });
        node.addEventListener('mouseleave', () => {
            node.querySelector('rect').setAttribute('fill', 'aquamarine');
        })
    }); 
});
