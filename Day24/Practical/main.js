const btn = document.getElementById('btn');

btn.addEventListener('click', () => {
    // 1. Added the .js extension (required)
    // 2. Ensure this is served via http:// (localhost) not file://
    import('./bigmodule.js') 
        .then(module => {
            module.updateBackgroundColor('lightblue');
        })
        .catch(err => {
            console.error('Failed to load the module:', err);
        });
});
