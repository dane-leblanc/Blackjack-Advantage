import runningCount1 from "./runningcount1.png";
export default function About() {
  return (
    <div>
      <h1>How to Count Cards</h1>
      <h2>Premise</h2>
      <p>
        Basic strategy, in a nutshell, assumes that the next card drawn will
        have a value of "ten", because there are more cards with a value of
        "ten" than any other value.
      </p>
      <p>
        If you are not familiar with basic strategy, STOP and study it first.
        Charts are provided in the "Basic Strategy" section for reference, but
        you will want to be very familiar with it before you start.
      </p>

      <p>
        Even by executing basic strategy, the house still has an edge (on
        average) over the player, meaning that in the long run, the house always
        wins.
      </p>
      <p>
        The higher concentration of "tens" there are remaining in the shoe, the
        better basic strategy works.
      </p>
      <p>
        If the player is able to make large bets when the shoe has a high
        concentration of "tens", and make low bets when the shoe has a low
        concentration of "tens", then the edge actually goes to the player.
      </p>
      <h2>What is actually being "counted"?</h2>
      <p>
        The way that we can keep track of this "concentration of tens" is by
        keeping what is known as a <b>"running count"</b>. To keep track of the
        running count, we assign a value of "+1" to each low card (2-6), a value
        of "0" to each medium card (7-9), and a value of "-1" to each high card
        (10-A).
      </p>
      <p>
        Let's say the first hand of the shoe runs out as shown below. What would
        the running count be going into the next hand?
      </p>
      <img src={runningCount1} alt="running count" />
      <p>
        We have four low cards (two 4s and two 5s) each worth "+1", two medium
        cards (we can ignore these) worth "0", and three high cards (one Queen
        and two Aces) each worth "-1". So the running count would be <b>+1</b>,
        meaning that there is one more high card left in the shoe than there are
        low cards!
      </p>
      <h2>The "true" count.</h2>
      <p>
        "Okay! The running count is +1, we have an advantage! Time to start
        raising our bets, right?"
      </p>
      <p>
        Not quite... there is one other key variable that we have to consider,
        how many cards are left to be dealt.
      </p>
      <p>
        Before we determine how we should adjust our bet-size, we need to
        calculate the <b>"True Count"</b>, which is the <b>running count</b>{" "}
        divided by the <b>number of decks left in the shoe.</b>
      </p>
      <p>
        For better accuracy, some would recommend keeping track of how many
        "half-decks" remain in the shoe. Remember, in blackjack (and in this
        app) each shoe starts with six decks (312 cards total).
      </p>
      <p>
        For example, if the <b>running count</b> is 18 and there are
        approximately 3.5 decks remaining in the shoe, the <b>true count</b>{" "}
        5.14 (or 5, after rounding).
      </p>
    </div>
  );
}
