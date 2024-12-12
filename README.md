# Floating Letters Animation (a work in progress)

## The Vision

Each letter of a word sinks to the bottom of the viewport, time-staggered one by one, like fish flakes floating down from the top of the tank to the bottom.

The animation uses `ease-in-out` easing to mimic the effect of an object sinking through water.

The viewport has a white background, but each letter is a mask for an undersea background image. So each letter is like a little letter-shaped window into the background image.

As each letter sinks down the viewport, different parts of the undersea background image are revealed.

Once the letters have landed, the letters expand until the entire background image is revealed.

## Specification

The letters should act like letter-shaped windows which reveal the background through a white sheet of paper as they animate.

As the letters moves, different portions of the background are revealed.

I also want the flexibility to use any string of letters, any `font-family`, and `font-size`. The font's letter kerning should be preserved.

![The gist of the effect](/public/vision.jpg)

Figma: [Link](https://www.figma.com/design/Xce2Pl5CuENR2xOcF3gBY3/Pretty-Landing-Page?node-id=0-1&t=NtWND3PZhlDAaaUM-1)

**Restriction**: No libraries! Let's see how far we can get with browser APIs only. Secondly, I'll go for the least complex solution possible.

## Attempt 1: CSS Background Clip

The simple solution is to use the `background-clip` CSS property.

```
.letter {
  /* ... letter styles and animation here */
}

.text-mask {
    background-clip: text;
    text-fill-color: transparent;
    background: url(undersea.jpg) no-repeat center center;
}
```

Use JS to split the word and apply the mask class to each letter, staggering the animation of each letter.

```
 text.split("").map((char, index) => (
    <span
        className="letter text-mask"
        key={index}
        style={{ animationDelay: `${index * 0.25}s` }}
    >
        {char}
    </span>
))
```

![Attempt 1: Ransom-note letters effect](/public/attempt1.gif)

#### Attempt 1:

- [Demo Link](https://text-mask-lp.vercel.app/attempt1)

- [Video](https://res.cloudinary.com/dufgddjc5/video/upload/v1733857752/attempt1_djf6gl.mp4)

- ✅ Text is accessible
- ✅ Text is dynamic
- ⚠️ Supported in modern browsers; but, no IE support.
- ✅ Robust animation
- ❌ Not getting the desired "letter window" effect

### Drawbacks of Attempt 1

The `background-clip: text` property creates an effect as though the background image had been cut out into letter shapes (eg: a ransom letter cut out of a magazine), and those cutout letters are then animating down a white sheet of paper. We're not getting the _letter-shaped window_ effect.

Browser support for `background-clip` is moderate with caveats in several browsers; and no support in IE: [CanIUse Ref](https://caniuse.com/?search=background-clip).

## Attempt 2: SVG Text Animation

Next, I tried a 100% SVG approach. We are using an SVG `<text>` elment as a `<mask>`. Each letter is wrapped in a `<tspan>` element so we can animate them individually using the `<animate>` tag.

We then apply the mask to an `<image>` element.

```
<svg width="100%" height="100%">
    <mask id="letterMask">
    <text
        x="50%"
        y="80%"
        fill="#ffffff"
        textAnchor="middle" // Center the text horizontally
    >
        {letters.map((letter, index) => (
        <tspan
            key={index}
            className={`letter letter-${index}`}
            fontFamily="sans-serif"
        >
            <animate
            attributeName="dy"
            from="0"
            to="-50%"
            dur="3s"
            repeatCount="indefinite"
            />
            {letter}
        </tspan>
        ))}
    </text>
    </mask>

    <image
    href="/underwater.jpg"
    width="100%"
    height="100%"
    mask="url(#letterMask)"
    />
</svg>
```

SIML animation browser support is pretty wide: [CanIUse Ref](https://caniuse.com/?search=svg%20animation)

![Attempt 2: Letter-window effect achieved](/public/attempt2.gif)

#### Attempt 2:

- [Demo Link](https://text-mask-lp.vercel.app/attempt2)

- [Video](https://res.cloudinary.com/dufgddjc5/video/upload/v1733858380/floating-svg_x0u0mq.mp4)

So we've gotten the "window" effect we want! There are both advantages and drawbacks here.

- ✅ Text is accessible
- ✅ Broad browser support.
- ✅ Text is dynamic.
- ⚠️ SIML implementations vary slightly across browsers, so thorough browser + device QA is required
- ❌ Very few attributes on the `<text>` and `<tspan>` elements are animatable (position, rotation, and text length are animatable; scaling is not!)
- ❌ Complex animation strains rendering performance.

SVG Animate Spec:[Link](https://svgwg.org/specs/animations/#AnimateElement)

### Drawbacks of Attempt 2

You can't use CSS transform on `<tspan>` SVG letters (SVG uses different rendering context than HTML elements).

Our options for animating the letters are:

- Add an `<animate>` element to each `<tspan>` letter in the SVG to animate positions.
- Add `<animateTransform>` property to transform: `translate`, `scale`, `rotate`, `skew` properties.

In order to animate attributes on the letters, we'll need two different SVG tags. And since SVG animation is declarative, we can only animate one attribute at a time, and we need multiple tags for complex animations. The more `<animate>` tags we use -- which is necessary for refined animation -- the greater the rendering performance implication.

This attempt is closest to the vision though, so we proceed from here!

## Attempt 3: SVG Text Animation, Refined

Let's refine the experience.

- I've added several declarative animations to get a floating effect for the letters.

- I've also added a staggered fade out for the letters, and an animated radial mask to reveal the background image (click the demo link to see this).

- I've added dynamic text functionality; change the text by appending `?text=your-text` to the url.

- I've also added an MVP for the final experience -- a simple landing page that plays deep sea ocean sounds.

![Attempt 3: Floaty text](/public/attempt3.gif)

#### Attempt 3:

- [Demo Link](https://text-mask-lp.vercel.app/attempt3) ⚠️ Animation not running in firefox

- [Demo Link with Dynamic Text via URL Parameter](https://text-mask-lp.vercel.app/attempt3?text=swimming) ⚠️ Animation not running in firefox

- [Video](https://res.cloudinary.com/dufgddjc5/video/upload/v1733932793/attempt3_tzxezj.mp4)

I'm 80% happy with this. The radial mask reveal is a little simplistic. The vision was to have each letter expand until the until the entire background is revealed. But for that, we'll need to abandon `<tspan>` and use `<path>` elements.

- ✅ Text is accessible
- ✅ Text is dynamic.
- ⚠️ SIML implementations vary slightly across browsers, so thorough browser + device QA is required
- ❌ Very few attributes on the `<text>` and `<tspan>` elements are animatable (position, rotation, and text length are animatable; scaling is not!)
- ❌ Complex animation strains rendering performance.
- ❌ Animation easing property breaks in Firefox

### Drawbacks of Attempt 3

When we specify that an animation should begin relative to the end of another animation, Firefox throws warning when using a dynamic id, and the animation doesn't run:

```
<animate
    id={`sink-${index}`}
/>

<animate
    begin={`sink-${index}.end + 1s`}
/>
```

Firefox doesn't run the animation when there are complex easing properties on the `<animate>` declarations:

```
<animate
    ...
    fill="freeze"
    calcMode="spline"
    keySplines="0.42 0 0.58 1"
/>
```

It will take some research to dig into why Safari and Chrome handle SVG animation structured this way, but Firefox does not. Here's my process for researching browser-specific bugs:

#### My process for diving into odd-man-out browser behavior 🕵🏾‍♀️

- 📚 Read the [SVG animate spec](https://www.w3.org/TR/SVG11/animate.html#AnimateElement) and ensure all `<animate>` attributes are being used to spec

- 🔍 Search for similar problems posted in the [Mozilla support forum](https://support.mozilla.org/ca/questions/firefox)

- 🪲 Look through Mozilla's issue tracker, [Bugzilla](https://bugzilla.mozilla.org/home), for any bugs related to SVG animaiton

## Attempt 4: Adding the letter expand effect with SVG Paths

The next step is to add the expand effect once the letters settle at the bottom of the viewport. But there is a problem with our current SVG implementation: `<tspan>` elements can't be transformed with `<animateTransform>`.

Let's try using letter `<path>` elements directly instead of `<text> > <tspan>`. If we need the ability to dynamically change the text, we can add paths for each letter to our `LETTER_PATH_DATA` object.

... (4 hours later)

The structure using `<path>`:

```
<defs>
<mask id="letterMask" x="0" y="0" width="100%" height="100%">
    <g>
        {"FLOATING".split("").map((letter, index) => {
            const letterSpacing = 190; // have to manually specify letter spacing
            const xPosition = index * letterSpacing; // manually specify xPos too
            const yPosition = 50;

            return (
            <LetterPath
                key={letter}
                letter={letter}
                x={+xPosition}
                y={yPosition}
            />
            );
        })}
    </g>
</mask>
</defs>
```

### Drawbacks of using `<path>`

It's been a few hours and I have implemented a basic animation using `<path>` elements for each letter, all grouped in a `<g>` tag. But there are some MAJOR drawbacks already.

- ❌ **Manual labor**: we have to convert the text to paths in Figma/Illustrator, then manually simplify the points in each path in Illustrator
- ❌ **No kerning**: By using `<path>` instead of `<text> > <tspan>`, we lose the font's natural kerning. There is an uncanny-valley effect when manually setting the letter spacing. Each letter will have unique spacing, which we'll have to manually define.
- ❌ **Not dynamic**: We can't dynamically update the text or font, since we are using predefined paths. We _could_ create a predefined path for every letter, but we would still be restricted to one font only.
- ❌ **Not inherently accessible**: We lose the inherent accessibility benefit of using a text element.
- ❌ **Safari's rendering engine can't cope**: Even using `will-change:transform` on the path elements does not help Safari render each letter's sinking animation. It's very janky.

### What's next?

Clearly, **[Attempt 3: SVG Text Animation](https://github.com/alexdhaynes/text-mask-svg-animation?tab=readme-ov-file#attempt-3-svg-text-animation-refined)** is the best approach. It is flexible. It is accessible. It requires no dependencies. It works well in 2/3 browsers and I'm confident that I can find a workaround for Firefox.

Although letters can't be transformed to get the mask effect I want, I have some ideas of how to accomplish this effect without having to transform the text.

Namely:

- dynamically inserting a second mask once the letter animation completes

- animating the dynamic mask to reveal the background image (instead of relying on a text transform to accomlish this)

Stay tuned for the final animation!

## TODOS

- [ ] Fix firefox animation bug
- [ ] Browser test for responsivity
- [ ] Accessibility testing
- [ ] Rendering performance optimizations
- [ ] Finalize the ocean sounds landing page
