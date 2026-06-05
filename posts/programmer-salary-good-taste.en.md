# A Programmer's High Salary Was Never in the Code (2): What Is Good Taste

At the end of the last piece I left a line: code will keep getting cheaper, and what stays expensive is the person who decides what the code should be and is willing to sign off on the consequences.

This piece picks up a harder question: that ability to "decide what the code should be" — what is it, exactly? Everyone calls it good taste, but the moment you press on what good taste specifically means, the answer splits into two camps. One camp says good taste is being able to think up lots of useful, cool features and make the product rich; the other says, on the contrary, good taste is subtraction — paring down, restraint, cutting everything that can be cut. Both sides are emphatic, both can cite gurus as examples.

More troubling is a third question: if taste is just personal preference, then it can neither be learned nor be right or wrong, and everyone can righteously call their own bad habits good taste. How do you judge whether someone's taste is genuinely good, or whether they're just repeatedly reinforcing a wrong set of things while believing themselves tasteful?

Let's look at a concrete example first, then come back and unpack these three questions.

In 2016, Linus Torvalds was asked at [TED](https://www.ted.com/talks/linus_torvalds_the_mind_behind_linux) what good taste is. He didn't lecture; he just showed two snippets of code, both deleting a node from a singly linked list. The first is what most people would write:

```c
remove_node(list, target) {
    prev = NULL;
    walk = list->head;
    while (walk != target) {
        prev = walk;
        walk = walk->next;
    }
    if (prev)
        prev->next = walk->next;
    else
        list->head = walk->next;   // deleting the head node, special case
}
```

The second, which he considered more tasteful:

```c
remove_node(list, target) {
    indirect = &list->head;
    while (*indirect != target)
        indirect = &(*indirect)->next;
    *indirect = target->next;       // no if; the head node is no longer special
}
```

The difference is that `if`. The first must separately check "is the node to delete the head," because the head has no predecessor and needs special handling. The second uses a pointer-to-a-pointer so the head and middle nodes take the same path, and that special case vanishes into thin air. Linus's own words: "I don't need you to understand why it has no if. I just want you to realize that sometimes you can look at a problem from a different angle and rewrite it so the special case becomes the normal case — that's good code."

This example is good because it yanks good taste out of mysticism in one move. Note: the second snippet isn't much shorter than the first, nor does it have more features. What's good about it? It's good because it makes "the head node" — something you'd otherwise have to worry about separately — no longer need to be worried about separately.

## First, pull good taste out of mysticism

Picking up the last piece's framework: AI is beating the "execution layer" down to dirt prices, and what's valuable is the "judgment layer." Good taste is the core ability of the judgment layer, but it's wrapped by two popular misconceptions into something like an inexplicable gift.

The first misconception: good taste is piling on features. The intuition is natural: great engineers always think of features others don't. But software history repeatedly hits a pit that Fred Brooks named the "second-system effect" — after finishing a restrained first system and tasting success, a person can't resist piling onto the second every bit of flashiness they'd held back, producing a bloated monster no one can maintain. More features never equals better taste; often it's the opposite.

The second misconception: good taste is "less is more," aesthetic minimalism. This is also wrong, or at least incomplete. If users genuinely need thirty features, then those thirty features are what the problem itself demands; cut any one and the software stops solving the problem. In ["No Silver Bullet"](https://en.wikipedia.org/wiki/No_Silver_Bullet) Brooks calls this kind of complexity "essential complexity": it comes from the problem itself and no amount of taste can dissolve it. Treating essential complexity as trimmable fat is another kind of tastelessness.

So does taste have an objective standard? In ["Taste for Makers"](https://paulgraham.com/taste.html) Paul Graham offers a sharp rhetorical question: if taste were purely personal preference, then everyone's taste would already be perfect — whatever you like is it, with no "better." But the reality is that anyone who seriously makes things blushes looking back at their work from three years ago. Your taste is improving. And the very fact of "improving" proves your past taste wasn't "different," it was "worse." That it can improve means there's a direction; that there's a direction means something objective is out there. Graham recently added a prediction: in the AI era taste matters more, because when anyone can make anything, what truly distinguishes people is [what you choose to make](https://x.com/paulg/status/2022604692178522562).

So the question isn't "does taste have a standard," but "what is that standard."

## Why the addition and subtraction camps are both right and both wrong

Now we can explain the split at the start. The addition and subtraction camps are arguing a false dichotomy, because both mistake taste for "the amount of code." The real axis isn't more versus less, it's whether complexity is essential or incidental.

Brooks's blade is handy: essential complexity comes from the problem itself, incidental complexity is what you introduce while solving it. Good taste is being able to tell the two apart, then defending the essential to the death and cutting away the incidental.

Following this blade, the ways addition and subtraction each go wrong become clear.

Addition goes wrong by treating incidental complexity as a feature. Adding a layer of abstraction "in case it's useful later," applying a design pattern "to look professional" — in the end this flexibility no one truly needs becomes a maintenance burden. This is the second-system effect mentioned above, and the main source of Brooks's incidental complexity.

Subtraction goes wrong more subtly, and more dangerously, because it often flies the banner of "simplicity." The classic case is "Chesterton's fence": you see a fence in the middle of the road, think it's useless, and want to tear it down. [G.K. Chesterton's answer](https://fs.blog/chestertons-fence/) is that if you don't know why the fence was put there, I precisely cannot let you tear it down. Once you understand its purpose, then we can talk about removing it. Code is full of these fences: a seemingly redundant check, a roundabout bit of logic, a strange default value — very likely something a predecessor added after stepping on some pit. The "fake taste" novices most easily commit is deleting what they don't understand as redundancy, deleting it with gusto, and three months later it blows up in production.

| Direction | How it goes wrong | Behind it |
| --- | --- | --- |
| Addition gone wrong | Piling abstractions and flexibility "in case it's useful later" | Treating incidental complexity as a feature (second-system effect) |
| Subtraction gone wrong | Deleting logic you don't understand as redundancy | Tearing down a fence without knowing why |

So the addition and subtraction camps are each half right: add the essential, cut the incidental. The half they're both wrong about is thinking direction itself (adding or subtracting) is taste. Direction isn't taste; telling essential from incidental is.

## Good taste's real anchor: making future changes easier

Is there a usable criterion you can ask yourself in front of every concrete decision? Yes. Put plainly, it's one sentence: does this decision make understanding and modifying the system in the future easier or harder?

In ["A Philosophy of Software Design"](https://blog.pragmaticengineer.com/a-philosophy-of-software-design-review/) John Ousterhout gives a wonderfully plain definition of complexity: complexity is anything that makes a system hard to understand and hard to modify. It has three symptoms: changing one place forces you to change a bunch of others; you have to hold too much in your head to dare to act; and worst of all, you don't even know which places your change will affect. Ousterhout's solution is "deep modules" — modules with simple interfaces and complex implementations, hiding complexity inside so users don't have to worry about it. Unix's file interface is just five functions, hiding behind them all the dirty work of files, directories, permissions, and concurrency — that's deep; conversely, a pile of little classes that require you to memorize a long call sequence is shallow: it didn't digest complexity, it just dumped it on you.

In ["Simple Made Easy"](https://www.infoq.com/presentations/Simple-Made-Easy/) Rich Hickey adds the key cut: simple and easy are two different things. Simple is objective — whether a thing is entangled with other things, which is observable; easy is relative — whether the thing is close to you, whether you're familiar with it. The two are often conflated, and that's precisely the breeding ground of "fake taste" — you think some approach is good when really you're just familiar with it.

Back to Linus's linked list. Seen through this framework it becomes transparent: his "tasteful" code isn't more concise showing-off, it untangles "the head node is special" at the data-structure level. Once the special case disappears, the reader has one fewer branch to remember, and the odds of stepping on a pit when modifying it later drop a notch. It's good because it made the future easier. That's the objective anchor.

Deeper still, in his 1985 ["Programming as Theory Building"](https://pages.cs.wisc.edu/~remzi/Naur.pdf) Peter Naur said a program is not its source code at all, but a "theory" living in the head of the person who wrote it — why the system is organized this way, what the trade-off behind each decision was. The source code is just a lossy projection of that theory. So the essence of taste is your grasp of the coherence of that theory: with each change, are you maintaining the theory's integrity, or stuffing in things that don't fit? After someone with taste edits the code, the system as a whole still makes sense; after someone without taste edits it, the features may run, but the theory has been punched full of holes, and later people understand less and less what the thing is even trying to do.

## How to practice it, and how not to mistake the wrong thing for good taste

Which brings the question junior programmers care about most: since taste has an objective anchor, can it be learned? Yes. But the way it's learned is completely unlike memorizing syntax or grinding problems — taste grows out of feedback loops, it isn't read out of a book. This also directly answers that most painful question: why would someone repeatedly reinforce the wrong thing while believing it's good taste?

The answer: because their feedback loop is broken.

Hickey's distinction between simple and easy becomes a trap here. If a person only writes new code, leaves once it's written, never gets reviewed, and has never maintained a system that lived for years, the only thing they can perceive is "is it smooth to write" — that is, easy. Over time, they treat every approach they're familiar with as good, and mistake every "I'm used to doing it this way" for "doing it this way has taste." It's not that they have no standard; it's that their standard has only one dimension left — familiarity — and the truly objective dimension, whether it's easy to change in the future, they never had a chance to experience, because they never return to the future.

So practicing taste is essentially finding a way to reconnect that broken feedback loop. There are three paths, ordered by effectiveness:

The strongest is to maintain code you wrote six months ago. Nothing calibrates taste better than being burned once by your past self. When you're cursing at that "clever" code you once wrote, spending half a day afraid to touch it, you truly understand what "making the future harder" means. This pain is taste's best teacher, and it's exactly the experience novices lack most.

The second is to read a lot of good systems' code and let others review yours. Reading battle-tested codebases like Redis, SQLite, Linux, what you see isn't syntax but countless judgments of "why is it handled this way here"; and being reviewed by senior people is like borrowing their already-grown feedback loop, seeing in advance what your decision will look like in five years.

The third is to cultivate the discipline of Chesterton's fence: before changing anything you don't understand, force yourself to articulate why it was there in the first place. If you can't, don't touch it. This one blocks the vast majority of "fake-taste subtraction."

Here we must connect to the last piece's "pipeline problem." The real risk AI brings isn't just taking junior jobs, it's that it conveniently removes the feedback loop above. When AI writes the code for you, you're no longer forced to read, modify, maintain — and the only painful process that grows taste is skipped. You'll feel you produce fast, yet stay forever at the easy level, taste stuck in place. This is what junior programmers should be most wary of in the AI era.

Conversely, this points to the right posture for using AI: let it write, but force yourself to explain why each of its decisions holds and how a different approach would differ; come back to read this code six months later; actively seek reviews of the AI-plus-you output. There's a very handy taste heuristic to carry around — "[write code that's easy to delete, not easy to extend](https://news.ycombinator.com/item?id=41968409)." Whether a piece of code is good often isn't about how extensible it is, but whether, the day it's no longer needed, you can cleanly remove it without disturbing a bunch of other things. If it can be cleanly deleted, it isn't tangled with the system — that's taste.

## Back to that if

After the detour, back to the if Linus deleted.

Good taste is neither addition nor subtraction. It's thinking the problem through clearly enough that the special cases you'd otherwise have to worry about separately disappear on their own. It has an objective anchor — making the system easier to understand and modify in the future; it can be learned, but only by repeatedly bearing the consequences of your own decisions, with no shortcut, and AI can't give a shortcut either.

This exactly completes the last piece's conclusion. AI made "writing code" cheap, but "deciding what the code should be" is still expensive, and that deciding ability is taste. It's what happens in the head of "the person willing to sign off on the consequences" in the moment before they sign — they can see what this change looks like in five years, can tell which complexity the problem forced and which they itched to add themselves, can judge whether this stroke made the system make more sense or more mess.

You can have AI write a hundred versions in one breath. But which to pick, why, and who's responsible when it breaks — AI can't take that on. That one-in-a-hundred judgment is taste, and it's your price.
