# About the Seat Shuffler

bell hooks [said](https://www.goodreads.com/quotes/8383318-the-classroom-remains-the-most-radical-space-of-possibility-in) that "The classroom remains the most radical space of possibility in the academy."

What characteristics of the classroom help create this radical possibility?

From what I have observed in dozens of classrooms, as well as what I have read in scholarship of teaching and learning (SoTL), one such characteristic is the chance to meet and learn from other people - especially people you would not otherwise have met. To support this, I expend some of my authority in the classroom towards regularly making students shuffle seats. I have been experimenting with different methods for seat shuffling since the first time I taught in 2022, and this is the current approach.

(When the "groups" are partners, I use a different approach to cycle through the different combinations, avoid repeats, and make accommodations.)

## How It Works

The basic goal is related to drawing numbers from a hat. Basically, imagine each student writes down their current table number on a slip of paper, then all those slips are shuffled and drawn randomly from a hat.

But if people were literally drawing slips from a hat, there is a possibility that they would end up at the same table where they are currently sitting. They might also migrate to a different table with the same people from their original table. This tool has constraints to prevent both such scenarios.

Because of these constraints, the tool does not actually "draw slips." Instead, it's a max-flow algorithm, with pseudocode as follows:
* Check absences, missing seats, and students marked to stay put (could be for a number of reasons)
* Figure out how many people each destination table should receive (at least three)
* Route everyone as a small "max-flow" problem, where each table "supplies" people shuffling out of it, each destination "demands" its share (counting anyone staying put there), and every table-to-table link has capacity one (forcing everyone at a table to split up).
* Any flow that moves everybody is a valid seating.
* The result is then randomly walked around the space of valid seatings by trading destinations between pairs of tables.
	* this keeps every constraint intact while spreading the result across the many valid seatings a room allows
	* i.e. it aovids returning the first solution the solver happens to find

## The Seed

If the Seed box is blank, pressing Shuffle asks [random.org](https://www.random.org/) for a whole number from 0 to 1000, then writes it into the box. In random.org's words, "The randomness comes from atmospheric noise, which for many purposes is better than the pseudo-random number algorithms typically used in computer programs." If random.org doesn't answer within three seconds, the browser picks the number instead (hover over the box to see what happened). That is the only time this page contacts another site.

Type a number into the box to use it instead, and random.org is never asked. Reset clears a drawn seed, so the next Shuffle draws a fresh one, and keeps a typed one.

The same seed number with the same seat states will always produce the same assignment.

## Showing the Result

Seats land one at a time, a quarter second apart, and each one shows its new table number. A student marked to stay lands on their own table number.

With Paths off, a small arrow next to the number points toward the destination table. **Colors** fills each landed seat with the CTA line color of the table it is heading to, and gives that table's "TABLE N" header the same color, so you match your seat's color to a header. **Paths** draws each seat's route through the aisles to its new table as the seat lands. They are independent, so you can use either, both, or neither.

Once a shuffle is on screen, the Shuffle button becomes ↩️ Reset, which clears the result and keeps any seat marks.

## Marking Seats

Click any seat to cycle its state: a die (random), then a ghost (absent), then an anchor (stays here), then back to the die. A random seat shuffles as usual. An absent seat means someone is not sitting there, so it is left out of the shuffle. A staying seat is a student who keeps their own chair through the shuffle.

The **Lectern POV** checkbox turns the room around to match the view from the lectern (screens at the bottom, windows on the right), which makes it easier to find the seat you are looking to mark as absent. The Shuffle button is turned off while Lectern POV is checked.

The chair itself does not disappear, so a table with an absent seat can still *receive* a full four students, and a table where every seat is absent stays in the room and can receive students too.

With enough absences and staying seats the constraints can become impossible to satisfy at once — a table of four has to split four ways, and those four destinations need at least three people each. When that happens a ⚠️ appears in the top-right corner; hover it for an explanation of which rule ran out of room. The tool would rather say so than quietly break one of its own rules.

Click the "Lectern thing" to add it to the shuffle: it turns dark like a seat in use, gets sent to a new table like everyone else.

The "loading" is purely for entertainment / amusement. The shuffle itself finishes in a few milliseconds (it's small and simple enough to brute-force) but the spinner effect is fun to watch for a few seconds. Same with the drawing animation. If you want more details, check out the javascript (`shuffle.js`) in the repository. It was largely written by LLMs.

## Constraints

This tool assumes a room of eight tables with four seats each, with any number of those seats marked absent or staying. When the seats are shuffled...
- At any table, the random seats all go to **different** destination tables.
- A random seat's destination is never its own table.
- Any table that has anyone (a staying student or an incoming one) will hold **at least three** people and never more than four.
- No table sits empty unless there genuinely aren't enough students to fill it under the rules above.
- A clicked lectern will be assigned a table like every other seat (nobody is sent to the lectern, at least for now).
- The same seed number with the same seat states will always produce the same assignment.

## TODO

Write more about the pedagogy behind the tool, the algorithm itself, the number of possibilities, etc.
