var modelViewerClick=function(obj, evt){
    
    var obj_tie = document.getElementById('tie_controls')
    tie_controls = false
    if (obj_tie.hasAttribute('tie-interactions')){
        tie_controls = true
    }
    if (evt.detail.source == 'user-interaction'){
        // console.log('Hi click on model viewer')
        var orbit = obj.getCameraOrbit();
        console.log(orbit)
        text = obj.id
        var name_array = ['demo1', 'demo2', 'demo3', 'demo4', 'demo5', 'demo6', 'demo7', 'demo8', 'demo9', 'demo10', 'demo11', 'demo12']
        var obj_array = []
        var orbit_array = []
        name_array.forEach((name) => {
            obj_array.push(document.getElementById(name));
            orbit_array.push(document.getElementById(name).getCameraOrbit());
        })
        if (tie_controls){
            for (let i = 0; i < name_array.length; i++) {
                if (name_array[i] != text) {
                    current_orbit = obj_array[i].getCameraOrbit();
                    obj_array[i].cameraOrbit = `${orbit.theta + 0.01}rad ${orbit.phi}rad ${current_orbit.radius}m`;
                    obj_array[i].interactionPrompt = 'none';
                    obj_array[i].jumpCameraToGoal();
                }
            }
        }
    }


}

function modelEventListeners(){
    console.log('enabled interactions')
    var x = document.getElementsByTagName('model-viewer');
    Array.from(x).forEach((el) => {
        var  mvid = el.getAttribute("mv-id")
        var id = el.getAttribute("id")
        el.addEventListener('camera-change', modelViewerClick.bind(event, el), 'false')
    });

}

function enableInteraction() {
    console.log('Click enableInteraction()')
    var x = document.getElementById('blink');
    var start_interaction = true
    if (x.hasAttribute('no-blink')){
        x.removeAttribute('no-blink')
        start_interaction = false
    }
    else{
        var att = document.createAttribute("no-blink");
        x.setAttributeNode(att);
        start_interaction = true
    }
    if (true){
        var x = document.getElementsByTagName('model-viewer');
        // console.log(x)
        // console.log('button ')
        // console.log(x.length)
        Array.from(x).forEach((el) => {
            // Do stuff here
            if (start_interaction) {
                var att = document.createAttribute("camera-controls");
                el.setAttributeNode(att);
            }
            else{
                el.removeAttribute("camera-controls");
            }

            
        });
    }
}

function enableInteractionTieControls() {
    console.log('Click enableInteractionTieControls()')
    var obj = document.getElementById('tie_controls')
    
    if (obj.hasAttribute('tie-interactions')){
        obj.removeAttribute('tie-interactions')
        // obj.textContent = "Tie Controls"
    }
    else{
        var att = document.createAttribute("tie-interactions");
        obj.setAttributeNode(att);
        console.log('Setting attribute')
        // obj.textContent = "UnTie Controls"
    }

}