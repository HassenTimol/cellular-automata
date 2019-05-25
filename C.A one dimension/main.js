function func() {

    grid=document.getElementById("canvas");
    gridLook=grid.getContext("2d");
    
    var cells = [];
    var generation;

    var w=4; 
    var x;
    x = document.getElementById("box_2")
    var ngens = parseInt(x.value);
    ngens = Math.round(ngens/4)*4
    grid.width = ngens*8

    var ruleset = [0,0,0,0,0,0,0,0];
    x = document.getElementById("box_1");
    
    var rule = parseInt(x.value);
    
    function dec2bin(num) {
        return num.toString(2);
    }

    
    var bin = dec2bin(rule);
    if(bin.length<8) {
        while(bin.length<8) {
            bin = "0" + bin;
        }
    }
    for(i = 0; i < bin.length; i++) {
        ruleset[i] = bin.substring(i,i+1);
    }


    /////////////// DEFINIT LA GENERATION PREMIERE ///////////////
    cells = new Array(grid.width/w);
    for(i=0; i<cells.length; i++) {
        cells[i] = 0;
    }

    
    cells[cells.length/2] = 1;
    generation = 0;

    for(j=0; j < ngens; j++) { /////////////// AFFICHE LES GENERATIONS
        display(cells);
        generate();
    }

    
    /////////////// UNE GENERATION A LA SUIVANTE ///////////////
    
    function generate() {
        
        nextGen = new Array(cells.length);
        for(var i=1; i<cells.length-1; i++) {
            var left = cells[i-1];
            if (left==undefined) {
                left = 0
            }
            var medium = cells[i];
            if (medium==undefined) {
                medium = 0
            }
            var right = cells[i+1];
            if (right==undefined) {
                right = 0
            }
            nextGen[i] = rules(left, medium, right);
        }
        cells = nextGen;
        generation++;
        display(nextGen);
    }    

    /////////////// DEFINIT L'AFFICHAGE ///////////////
    function display(cells) {
        for(i=0; i< cells.length; i++) {
            if (cells[i] == 1) {
                gridLook.fillStyle = "black";
            }else {
                gridLook.fillStyle = "#FFFACD";
            }
            gridLook.fillRect(i*w, generation*w, w, w);
        }
    }


    function rules(a, b, c) {
        if (a==1 && b==1 && c==1) return ruleset[0];
        if (a==1 && b==1 && c==0) return ruleset[1];
        if (a==1 && b==0 && c==1) return ruleset[2];
        if (a==1 && b==0 && c==0) return ruleset[3];
        if (a==0 && b==1 && c==1) return ruleset[4];
        if (a==0 && b==1 && c==0) return ruleset[5];
        if (a==0 && b==0 && c==1) return ruleset[6];
        if (a==0 && b==0 && c==0) return ruleset[7];
    }
}

