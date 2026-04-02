const btn = document.getElementById('btn');
    btn.addEventListener('click', () => {
        const heavyModule = import('./bigmodule.js');
        heavyModule.then(module => {
            module.updateBackgroundColor('lightblue');
        }).catch(err => {
            console.error('Failed to load the module:', err);
        });
    });