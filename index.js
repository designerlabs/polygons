var http = require('http');

function countInArray(array, what) {
    var count = 0;
    for (var i = 0; i < array.length; i++) {
        if (parseInt(array[i]) === what) {
            count++;
        }
    }
    return count;
}

http.createServer(function (req, res) {
    var trianglesArray = [];
    var rectanglesArray = [];
    var squaresArray = [];
    var othersArray = [];
    var mutuallyExclusiveSubsets = [];


    var path = './polygons.txt';
    var fs  = require("fs");
    fs.readFile(path, function(err, f){
        var array = f.toString().split('\n');
        // use the array
        console.log('All Polygons');
        console.log(array);
    
       
    
        for(var i= 0; i < array.length ;i++)
        {
            var item  = array[i];
            var lines =  item.split(',');
            var length = lines.length;
    
            switch(length)
            {
                case 3 :
    
                var a = parseInt(lines[0]);
                var b = parseInt(lines[1]);
                var c = parseInt(lines[2]);
                if (((a + b) > c) && ((a + c) > b) && ((b + c) > a)) {
                trianglesArray.push(item); } else { othersArray.push(item);}
                break;
    
                case 4 :
    
                var a = parseInt(lines[0]);
                var b = parseInt(lines[1]);
                var c = parseInt(lines[2]);
                var d = parseInt(lines[3]);
    
                var result = lines.reduce(function( accumlative, currentLine) {
                    return parseInt(currentLine)  === a;
                });
                
                if(result)
                {
                    squaresArray.push(item);
                    break;
                }
                else 
                if(((countInArray(lines, a) == 2) && (countInArray(lines, b) == 2))
                ||  ((countInArray(lines, a) == 2) && (countInArray(lines, c) == 2)) 
                ||  ((countInArray(lines, a) == 2) && (countInArray(lines, d) == 2)) 
                ||  ((countInArray(lines, b) == 2) && (countInArray(lines, c) == 2)) 
                ||  ((countInArray(lines, b) == 2) && (countInArray(lines, d) == 2)) 
                ||  ((countInArray(lines, c) == 2) && (countInArray(lines, d) == 2)) ) 
                {  rectanglesArray.push(item);   } 
                else {
                  othersArray.push(item); }
                break;
    
                default:
                othersArray.push(item);
                break;
    
            }
        }
    
    
        mutuallyExclusiveSubsets = trianglesArray.concat (squaresArray, rectanglesArray, othersArray);
    

        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(`
            <h2>polygons triangles subsets: <code>[${trianglesArray}]</code></h2>
            <h2>polygons squares subsets: <code>[${squaresArray}]</code></h2>
            <h2>polygons rectangles subsets: <code>[${rectanglesArray}]</code></h2>
            <h2>polygons others subsets: <code>[${othersArray}]</code></h2>
            <h2>The union of all four mutually Exclusive Subsets Polygons : <pre>[${mutuallyExclusiveSubsets}]</pre></h2>
            <h2>The union Subsets length equal the Orginal Set length: <code>[${(mutuallyExclusiveSubsets.length ==  array.length )? true : false}]</code></h2>
        `);
    });

    
    
}).listen(8080)



