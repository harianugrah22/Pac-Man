//////////////////////////////////////////////////////////////////////////////////////
// Directions
// (variables and utility functions for representing actor heading direction)

// direction enums (in counter-clockwise order)
// NOTE: changing the order of these enums may effect the enums.
//       I've tried abstracting away the uses by creating functions to rotate them.
// NOTE: This order determines tie-breakers in the shortest distance turn logic.
//       (i.e. higher priority turns have lower enum values)
var DIR_UP = 0;
var DIR_LEFT = 1;
var DIR_DOWN = 2;
var DIR_RIGHT = 3;

var getClockwiseAngleFromTop = function(dirEnum) {
    return -dirEnum*Math.PI/2;
};

var rotateLeft = function(dirEnum) {
    return (dirEnum+1)%4;
};

var rotateRight = function(dirEnum) {
    return (dirEnum+3)%4;
};

var rotateAboutFace = function(dirEnum) {
    return (dirEnum+2)%4;
};

// get direction enum from a direction vector
var getEnumFromDir = function(dir) {
    if (dir.x==-1) return DIR_LEFT;
    if (dir.x==1) return DIR_RIGHT;
    if (dir.y==-1) return DIR_UP;
    if (dir.y==1) return DIR_DOWN;
};

// set direction vector from a direction enum
var setDirFromEnum = function(dir,dirEnum) {
    if (dirEnum == DIR_UP)         { dir.x = 0; dir.y =-1; }
    else if (dirEnum == DIR_RIGHT)  { dir.x =1; dir.y = 0; }
    else if (dirEnum == DIR_DOWN)  { dir.x = 0; dir.y = 1; }
    else if (dirEnum == DIR_LEFT) { dir.x = -1; dir.y = 0; }
};

var getDirFromEnum = function(dirEnum) {
    var dir = {};
    if (dirEnum == DIR_UP)         { dir.x = 0; dir.y =-1; }
    else if (dirEnum == DIR_RIGHT)  { dir.x =1; dir.y = 0; }
    else if (dirEnum == DIR_DOWN)  { dir.x = 0; dir.y = 1; }
    else if (dirEnum == DIR_LEFT) { dir.x = -1; dir.y = 0; }
    return dir;
};

var getTurnClosestToTarget2 = function(tile,targetTile,openTiles,ghostName) {
    var i4;
	var Mesh = {};
    for (i4=0; i4 <100; i4++){
	    Mesh[i4]={};
    }
	var dx,dy,dist;               // variables used for euclidean distance
    var minDist = -Infinity;      // variable used for finding maximum value of path
    var dir = {};
    var dirEnum = 0;
    var i3;
	var w;
    var count;
	var t;
	var b;
	var l;
	var r;
	var j;
	var i;
	var a;
	var atoms={};
	var atom;
    var sum=0;
    var sums=0;
    var j2;
    var i2;
    var average;
	var diffx;
	var diffy;
	var maxw;
	var totalsums;

	try{
		if (Mesh[targetTile.x] === undefined) {
			Mesh[targetTile.x] = {};
		}		
		Mesh[targetTile.x][targetTile.y]=1024;
		diffx=Math.abs(targetTile.x-tile.x);
		diffy=Math.abs(targetTile.y-tile.y);
		if(diffx>=diffy){
			maxw=diffx+2;
		}else{
			maxw=diffy+2;
		}
		for(w = 1; w <= maxw; w++){
			count = 0;
			t = targetTile.y - w; // Top.
			b = targetTile.y + w; // Bottom.
			l = targetTile.x - w; // Left.
			r = targetTile.x + w; // Right.
			for(j = t; j <= b; j++){
				for(i = l; i <= r; i++){
					if((i == l || j == t || i == r || j == b)&&(!(i<0 || i>=28 || j<0 || j>=36))){
						for (j2 = j - 1; j2 <= j + 1; j2++) {
							for (i2 = i - 1; i2 <= i + 1; i2++) {
								if (!(i2<0 || i2>=28 || j2<0 || j2>=36)){
									if (!(j2 == j && i2 == i)) {
										if (Mesh[i2] === undefined) {
											Mesh[i2] = {};
										}
										if (Mesh[i2][j2]==null){
											Mesh[i2][j2]=0;
										}
										sum +=Mesh[i2][j2];
										sums++;
									}
								}
							}
						}
						if(Math.abs(pacman.tile.x-tile.x)<3&&Math.abs(pacman.tile.y-tile.y)<3){
							totalsums=sums;
						}else{
							if(ghostName==blinky){		
								if((i==pinky.tile.x&&j==pinky.tile.y)||(i==(pinky.tile.x-1)&&j==(pinky.tile.y))||(i==(pinky.tile.x)&&j==(pinky.tile.y-1))||(i==(pinky.tile.x)&&j==(pinky.tile.y+1))||(i==(pinky.tile.x+1)&&j==(pinky.tile.y))
									||(i==inky.tile.x&&j==inky.tile.y)||(i==(inky.tile.x-1)&&j==(inky.tile.y))||(i==(inky.tile.x)&&j==(inky.tile.y-1))||(i==(inky.tile.x)&&j==(inky.tile.y+1))||(i==(inky.tile.x+1)&&j==(inky.tile.y))
									||(i==clyde.tile.x&&j==clyde.tile.y)||(i==(clyde.tile.x-1)&&j==(clyde.tile.y))||(i==(clyde.tile.x)&&j==(clyde.tile.y-1))||(i==(clyde.tile.x)&&j==(clyde.tile.y+1))||(i==(clyde.tile.x+1)&&j==(clyde.tile.y))){
										totalsums=sums^2;
								}else{
									totalsums=sums;
								}
							} else if(ghostName==pinky){
								if((i==blinky.tile.x&&j==blinky.tile.y)||(i==(blinky.tile.x-1)&&j==(blinky.tile.y))||(i==(blinky.tile.x)&&j==(blinky.tile.y-1))||(i==(blinky.tile.x)&&j==(blinky.tile.y+1))||(i==(blinky.tile.x+1)&&j==(blinky.tile.y))
									||(i==inky.tile.x&&j==inky.tile.y)||(i==(inky.tile.x-1)&&j==(inky.tile.y))||(i==(inky.tile.x)&&j==(inky.tile.y-1))||(i==(inky.tile.x)&&j==(inky.tile.y+1))||(i==(inky.tile.x+1)&&j==(inky.tile.y))
									||(i==clyde.tile.x&&j==clyde.tile.y)||(i==(clyde.tile.x-1)&&j==(clyde.tile.y))||(i==(clyde.tile.x)&&j==(clyde.tile.y-1))||(i==(clyde.tile.x)&&j==(clyde.tile.y+1))||(i==(clyde.tile.x+1)&&j==(clyde.tile.y))){
										totalsums=sums^2;
								}else{
									totalsums=sums;
								}
							} else if(ghostName==inky){	
								if((i==blinky.tile.x&&j==blinky.tile.y)||(i==(blinky.tile.x-1)&&j==(blinky.tile.y))||(i==(blinky.tile.x)&&j==(blinky.tile.y-1))||(i==(blinky.tile.x)&&j==(blinky.tile.y+1))||(i==(blinky.tile.x+1)&&j==(blinky.tile.y))
									||(i==pinky.tile.x&&j==pinky.tile.y)||(i==(pinky.tile.x-1)&&j==(pinky.tile.y))||(i==(pinky.tile.x)&&j==(pinky.tile.y-1))||(i==(pinky.tile.x)&&j==(pinky.tile.y+1))||(i==(pinky.tile.x+1)&&j==(pinky.tile.y))
									||(i==clyde.tile.x&&j==clyde.tile.y)||(i==(clyde.tile.x-1)&&j==(clyde.tile.y))||(i==(clyde.tile.x)&&j==(clyde.tile.y-1))||(i==(clyde.tile.x)&&j==(clyde.tile.y+1))||(i==(clyde.tile.x+1)&&j==(clyde.tile.y))){
										totalsums=sums^2;
								}else{
									totalsums=sums;
								}
							} else if(ghostName==clyde){
								if((i==blinky.tile.x&&j==blinky.tile.y)||(i==(blinky.tile.x-1)&&j==(blinky.tile.y))||(i==(blinky.tile.x)&&j==(blinky.tile.y-1))||(i==(blinky.tile.x)&&j==(blinky.tile.y+1))||(i==(blinky.tile.x+1)&&j==(blinky.tile.y))
									||(i==pinky.tile.x&&j==pinky.tile.y)||(i==(pinky.tile.x-1)&&j==(pinky.tile.y))||(i==(pinky.tile.x)&&j==(pinky.tile.y-1))||(i==(pinky.tile.x)&&j==(pinky.tile.y+1))||(i==(pinky.tile.x+1)&&j==(pinky.tile.y))
									||(i==inky.tile.x&&j==inky.tile.y)||(i==(inky.tile.x-1)&&j==(inky.tile.y))||(i==(inky.tile.x)&&j==(inky.tile.y-1))||(i==(inky.tile.x)&&j==(inky.tile.y+1))||(i==(inky.tile.x+1)&&j==(inky.tile.y))){
										totalsums=sums^2;
								}else{
									totalsums=sums;
								}
							}
						}
						average = sum/totalsums;
						atom={x:i, y:j, val:average};
						atoms[count++]=atom;
					}
				}
			}
			for(a = 0; a < count; a++){
				if (Mesh[atoms[a].x] === undefined) {
					Mesh[atoms[a].x] = {};
				}
				Mesh[atoms[a].x][atoms[a].y] = atoms[a].val;
			}
			
			count = 0;
			t = targetTile.y - (w-1); // Top.
			b = targetTile.y + (w-1); // Bottom.
			l = targetTile.x - (w-1); // Left.
			r = targetTile.x + (w-1); // Right.
			for(j = t; j <= b; j++){
				for(i = l; i <= r; i++){
					if((i == l || j == t || i == r || j == b)&&(!(i<0 || i>=28 || j<0 || j>=36))){
						for (j2 = j - 1; j2 <= j + 1; j2++) {
							for (i2 = i - 1; i2 <= i + 1; i2++) {
								if (!(i2<0 || i2>=28 || j2<0 || j2>=36)){
									if (!(j2 == j && i2 == i)) {
										if (Mesh[i2] === undefined) {
											Mesh[i2] = {};
										}
										if (Mesh[i2][j2]==null){
											Mesh[i2][j2]=0;
										}
										sum +=Mesh[i2][j2];
										sums++;
									}
								}
							}
						}
						if(sum!=0){
							average = sum/sums;
						}else{
							average=0;
						}
						atom={x:i, y:j, val:average};
						atoms[count++]=atom;
					}
				}
			}
			for(a = 0; a < count; a++){
				if (Mesh[atoms[a].x] === undefined) {
					Mesh[atoms[a].x] = {};
				}
				Mesh[atoms[a].x][atoms[a].y] = atoms[a].val;
			}
		}
		for (i3=0; i3<4; i3++) {
			if (openTiles[i3]) {
				setDirFromEnum(dir,i3);
				dx = dir.x + tile.x;
				dy = dir.y + tile.y;
				if (Mesh[dx] === undefined) {
					Mesh[dx] = {};
				}
				if (Mesh[dx][dy]==null){
					Mesh[dx][dy]=0;
				}
				
				dist = Mesh[dx][dy];
				if (dist > minDist) {
					minDist = dist;
					dirEnum = i3;
				}
			}
		}
		return dirEnum;
	}
	catch(err){
		document.write(err);
	}
};

// return the direction of the open, surrounding tile closest to our target
var getTurnClosestToTarget = function(tile,targetTile,openTiles) {

    var dx,dy,dist;                      // variables used for euclidean distance
    var minDist = Infinity;              // variable used for finding minimum distance path
    var dir = {};
    var dirEnum = 0;
    var i;
    for (i=0; i<4; i++) {
        if (openTiles[i]) {
            setDirFromEnum(dir,i);
            dx = dir.x + tile.x - targetTile.x;
            dy = dir.y + tile.y - targetTile.y;
            dist = dx*dx+dy*dy;
            if (dist < minDist) {
                minDist = dist;
                dirEnum = i;
            }
        }
    }
    return dirEnum;
};

var myGetTurnClosestToTarget = function(player) {
    var minDistance = Infinity;
    var minDepth = Infinity;
    var bestDirEnum = 0;
    var amIonATunnelBorder = map.getOppositeTunnelTile(player.tile);
    if (amIonATunnelBorder) {
        player.avoidThisTileWhileFindingBestRoute = _.clone(player.tile);
    }
    var openDirEnums = getOpenDirEnums(player.tile, player.dirEnum, amIonATunnelBorder);
    for (var index = 0; index < openDirEnums.length; index++) {
        var dir = getDirFromEnum(openDirEnums[index]);
        var nextTile = {x: player.tile.x + dir.x, y: player.tile.y + dir.y};
        if (!player.avoidThisTileWhileFindingBestRoute || nextTile.x !== player.avoidThisTileWhileFindingBestRoute.x
            || nextTile.y !== player.avoidThisTileWhileFindingBestRoute.y)
        {
            var oppositeTunnelTile = map.getOppositeTunnelTile(nextTile);
            if (oppositeTunnelTile) nextTile = oppositeTunnelTile;
            var option = getShortestDistancePath(nextTile, player.targetTile, openDirEnums[index], 0, player);
            if (option.distance < minDistance || (
                option.distance === minDistance && option.depth < minDepth)) {
                minDistance = option.distance;
                minDepth = option.depth;
                bestDirEnum = openDirEnums[index];
            }
        }
    }
    return bestDirEnum;
};

var getShortestDistancePath = function(tile, targetTile, dirEnum, depth, player) {
    if (tile.x === targetTile.x && tile.y === targetTile.y) return {distance: 0, depth: depth};
    if (depth > 15) {
        var dx,dy,dist;                      // variables used for euclidean distance
        dx = tile.x - targetTile.x;
        dy = tile.y - targetTile.y;
        dist = dx*dx+dy*dy;
        return {distance: dist, depth: depth};
    }

    var minDistance = Infinity;
    var openDirEnums = getOpenDirEnums(tile, dirEnum, true);
    for (var index = 0; index < openDirEnums.length; index++) {
        var dir = getDirFromEnum(openDirEnums[index]);
        var nextTile = {x: tile.x + dir.x, y: tile.y + dir.y};
        if (!player.avoidThisTileWhileFindingBestRoute || nextTile.x !== player.avoidThisTileWhileFindingBestRoute.x
            || nextTile.y !== player.avoidThisTileWhileFindingBestRoute.y) {
            var oppositeTunnelTile = map.getOppositeTunnelTile(nextTile);
            if (oppositeTunnelTile) nextTile = oppositeTunnelTile;

            var option = getShortestDistancePath(nextTile, targetTile, openDirEnums[index], depth + 1, player);
            if (option.distance === 0) return option;
            if (option.distance < minDistance) {
                minDistance = option.distance;
            }
        }
    }

    return {distance: minDistance, depth: depth};
};

// retrieve four surrounding tiles and indicate whether they are open
var getOpenTiles = function(tile,dirEnum, includeTheDirectionWeCameFrom) {

    // get open passages
    var openTiles = {};
    openTiles[DIR_UP] =    map.isFloorTile(tile.x, tile.y-1);
    openTiles[DIR_RIGHT] = map.isFloorTile(tile.x+1, tile.y);
    openTiles[DIR_DOWN] =  map.isFloorTile(tile.x, tile.y+1);
    openTiles[DIR_LEFT] =  map.isFloorTile(tile.x-1, tile.y);

    if (!includeTheDirectionWeCameFrom) {
        var numOpenTiles = 0;
        var i;
        if (dirEnum != undefined) {

            // count number of open tiles
            for (i = 0; i < 4; i++)
                if (openTiles[i])
                    numOpenTiles++;

            // By design, no mazes should have dead ends,
            // but allow player to turn around if and only if it's necessary.
            // Only close the passage behind the player if there are other openings.
            var oppDirEnum = rotateAboutFace(dirEnum); // current opposite direction enum
            if (numOpenTiles > 1)
                openTiles[oppDirEnum] = false;
        }
    }

    return openTiles;
};


var getOpenDirEnums = function(tile, dirEnum, noRetreat) {
    var openDirEnums = [];
    // exclude the direction from which we came
    if (map.isFloorTile(tile.x, tile.y-1)){ openDirEnums.push(DIR_UP); }
    if (map.isFloorTile(tile.x+1, tile.y)) { openDirEnums.push(DIR_RIGHT); }
    if (map.isFloorTile(tile.x, tile.y+1)) { openDirEnums.push(DIR_DOWN); }
    if (map.isFloorTile(tile.x-1, tile.y)) { openDirEnums.push(DIR_LEFT); }

    if (noRetreat) openDirEnums = _.without(openDirEnums, rotateAboutFace(dirEnum));

    return openDirEnums;
};


// returns if the given tile coordinate plus the given direction vector has a walkable floor tile
var isNextTileFloor = function(tile,dir) {
    return map.isFloorTile(tile.x+dir.x,tile.y+dir.y);
};

