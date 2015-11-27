$(document).ready(function() {	
    // 3.12.12, 4.6.12, 4.8.8, 6.6.6, and rosette dual tilings 10RD and 8RD

    var canvas = new fabric.StaticCanvas('c');

    function make_regular_polygon(x,y,r,n,print_coords = false){
        var shape = "";
        
        for (i = 0; i < n; i++) {
           shape_x = x + r * Math.cos(2 * Math.PI * i / n); 
           shape_y = y + r * Math.sin(2 * Math.PI * i / n);
           if (print_coords == true){
                console.log(shape_x, shape_y)
           }
           if (i==n-1){
               shape = shape + " " + shape_x + " " + shape_y + " z";
           } else {
               shape = shape + " " + shape_x + " " + shape_y + " L ";
           }
        }
        var path = new fabric.Path("M " + shape);
        return path;
    }

    function determine_vertices(x,y,r,n){
        var vertices = [];
        for (i = 0; i < n; i++) {
                tmp_x = x + r * Math.cos(2 * Math.PI * i / n); 
                tmp_y = y + r * Math.sin(2 * Math.PI * i / n);

                vertices.push([tmp_x, tmp_y]);
        }
        return vertices;
    }

    function determine_midpoints(vertices){
            var midpoints = [];
            var l = vertices.length
            for(var v = 0; v < l; v++){
                tmp_x = (vertices[v%l][0] + vertices[(v+1)%l][0])/2
                tmp_y = (vertices[v%l][1] + vertices[(v+1)%l][1])/2

                midpoints.push([tmp_x, tmp_y])
            }
            return midpoints;
    }

    var centre_x = 250;
    var centre_y = 150;
    var theta = 30;
    var angle = (360 - theta) * (Math.PI/180);
    var vertices = determine_vertices(centre_x,centre_y,75,12);
    var midpoints = determine_midpoints(vertices);

    var p1 = vertices[0];
    var m1 = midpoints[0];

    var n1_x = Math.cos(angle) * (p1[0] - m1[0]) - Math.sin(angle) * (p1[1] - m1[1]) + m1[0];
    var n1_y = Math.sin(angle) * (p1[0] - m1[0]) + Math.cos(angle) * (p1[1] - m1[1]) + m1[1];
    var n1 = [n1_x, n1_y];
   
    var l1_slope = (n1_y-m1[1])/(n1_x-m1[0]);
    var l1_b = n1_y - (l1_slope)*n1_x;

    var l2_slope = (centre_y - p1[1])/(centre_x - p1[0]);
    var l2_b = centre_y - (l2_slope)*centre_x;
        
    var px = (l2_b - l1_b)/(l1_slope - l2_slope);
    var py = l1_slope*px + l1_b;
    var p = [px, py];
    
    var motif_path = new fabric.Line([m1[0], m1[1], px, py],
            {
              fill: 'green',
              stroke: 'green',
              strokeWidth: 1,
              selectable: false
            }
            );

    console.log("p1: " + p1);
    console.log("n1: " + n1);
    console.log("m1: " + m1);
    console.log("p: " + p);

    var m1_circle = new fabric.Circle({
            radius:4,
            fill:'red',
            left:m1[0],
            top:m1[1]
    })
    
    var p1_circle = new fabric.Circle({
            radius:4,
            fill:'black',
            left:p1[0],
            top:p1[1]
    })
    
    var n1_circle = new fabric.Circle({
            radius:4,
            fill:'orange',
            left:n1[0],
            top:n1[1]
    })
    
    var p_circle = new fabric.Circle({
            radius:4,
            fill:'green',
            left:px,
            top:py
    })
    
    // 3.12.12
    var dodecagon = make_regular_polygon(centre_x,centre_y,75,12);
    dodecagon.set({
        fill:'white',
        stroke:'green',
    })
    
    var triangle = make_regular_polygon(132,80,23,3);
    triangle.set({
        fill:'white', 
        stroke:'green',
    })
    //canvas.add(dodecagon);
    /**
    canvas.add(p1_circle);
    canvas.add(m1_circle);
    canvas.add(n1_circle);
    canvas.add(p_circle);
    **/
    //canvas.add(motif_path);
    var group = new fabric.Group([dodecagon, motif_path]);
    canvas.add(group);
   /** 
    // I make the translational unit by cheating and overlapping pg_1 and pg_2.
    var pg_1 = new fabric.Group([dodecagon, triangle]);      
    var pg_2 = new fabric.Group([dodecagon, triangle]);
    pg_1.set({
            top:100,
            left:145,
            angle:360/12,
    })
    pg_2.set({
            top:146.7,
            left:279,
            angle:360/4
    })
    **/
    //canvas.add(circle);
    //canvas.add(pg_2);
    // Everything past this line is concerned with tiling the plane, not PIC.
    /**
    // making a stack of translational units, so I translate them horizontally ... if this library's
    // documentation wasn't impossible to read, I could have just used vectors.
    // Note to self: the column is actually "two columns"
    var column = new fabric.Group();
    for (var k = -3; k<7; k++){
            var temp_group_left = new fabric.Group([pg_1, pg_2]);      
            temp_group_left.set({
                left:300,
                top:-101+(146*k)
            });

            var temp_group_right = new fabric.Group([pg_1, pg_2]);       
            temp_group_right.set({
                left:425,
                top:-174+(146*k)
            });
            column.add(temp_group_left, temp_group_right);
    }
    // Finally putting everything together!
    var tiling = new fabric.Group();
    for (var j = -3; j < 4; j++){
            var tg = new fabric.Group([column]);
            tg.set({
               left:250*j,
            });
            tiling.add(tg);
    }
    canvas.add(tiling);
    **/
});
