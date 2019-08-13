# snake-game

Personal project -- SnakeGame using vanilla JS with a reset function, and teleporting borders

### Neat things 
- Spent alot of effort fixing the 'u-turn bug' where the snake could go in reverse. 

##### Implementation 1 of 'prevent reverse direction' :
Current direction was stored as a VAR (curDirection = 'north') 
When current direction was 'north', prevent player from going 'south' during the next game tick. (30ms~ for every tick)
But, if you rapidly pressed 'east' then 'south', the curDirection will change from 'north' to 'east', and then 'east' to 'south'.
This all happens within the 30ms in-between time, so during the next game tick, the game will see that the snake is going 'south', 
and as such a reverse-direction is achieved.

##### Implementation 2
Allow player to change directions only once during a game tick. A variable 'changedDirection' is set to true every time the
direction changes, and during a game tick, 'changedDirection' will be set back to false to allow the player to change direction again.

This fixes the reverse direction bug, but at the cost of the game feeling unresponsive. Some moves may be skipped if the player presses
too fast.

##### Implementation 3
The usage of a 'move queue'. Every move the player makes is appended to a 'moves' array, and the first item is popped during the start of each
game tick. To prevent the player from mashing buttons then having the snake just automove, the queue is constantly trimmed to a length of
3. So far, this is the best solution I have for the reverse-direction problem.

### Github Pages 

https://dweggyness.github.io/snake-game/

