# Floating Letters Animation

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

**Restriction**: No libraries! Can you accomplish this with browser APIs only? Also go for the least complex solution possible.

## Attempt 1: Simple Solution

The simple solution is to use the `background-clip` CSS property.
✅ Text is accessible
✅ Text is dynamic
⚠️ Supported in modern browsers; but, no IE support.
✅ Robust animation
❌ Not getting the desired "letter window" effect

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

Attempt 1: [Video](https://res.cloudinary.com/dufgddjc5/video/upload/v1733857752/attempt1_djf6gl.mp4)

Src: `/src/attempt1/AnimatedMaskedText.tsx`

## Attempt 1: Drawbacks

The `background-clip: text` property creates an effect as though the background image had been cut out into letter shapes (eg: a ransom letter cut out of a magazine), and those cutout letters are then animating down a white sheet of paper. We're not getting the _letter-shaped window_ effect.

Browser support for `background-clip` is moderate with caveats in several browsers; and no support in IE: [Link](https://caniuse.com/?search=background-clip).

## Attempt 2: SVG Approach

Next, I tried a 100% SVG approach. We are using an SVG `<text>` elment as a `<mask>`. Each letter is wrapped in a `<tspan>` element so we can animate them individually using the `<animate>` tag.

We then apply the mask to an `<image>` element.

✅ Text is accessible
✅ Broad browser support.
✅ Text is dynamic.
⚠️ SIML implementations vary slightly across browsers, so thorough browser + device QA is required
❌ Very few attributes on the `<text>` and `<tspan>` elements are animatable (position, rotation, and text length are animatable; scaling is not!)

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

SIML animation browser support is pretty wide: [Link](https://caniuse.com/?search=svg%20animation)

Attempt 2: [Video](https://res.cloudinary.com/dufgddjc5/video/upload/v1733858380/floating-svg_x0u0mq.mp4)

So we've gotten the "window" effect we want! However, there are drawbacks here.

### Attempt 2 Drawbacks:

You can't use CSS transform on `<tspan>` SVG letters (SVG uses different rendering context than HTML elements).

Our options for animating the letters are:

- Add an `<animate>` element to each `<tspan>` letter in the SVG to animate positions.
- Add `<animateTransform>` property to transform: `translate`, `scale`, `rotate`, `skew` properties.

So that's two different SVG elements for _every single letter_. Cumbersome!

SVG Animate Spec:[Link](https://svgwg.org/specs/animations/#AnimateElement)

This attempt is closest to the vision though, so we proceed from here!

## Adding the expand effect

The next step is to add the expand effect once the letters settle at the bottom of the viewport. But there is a problem with using the SVG: `<tspan>` elements can't be transformed with `<animateTransform>`.

What can we do?

### Canvas?

We need a more flexible element than `<text> > <tspan>`. What if we found a way to convert text into a `<path>`? Then the world would be our oyster in terms of animation flexibility...

### Keep it simple

At the moment, the ability to change text dynamically is not critical. So let's try using letter `<path>` elements directly instead of `<text> > <tspan>`. If we find that we need the ability to dynamically change the text, we'll look into writing a function that will convert text strings into `<path>` elements.
