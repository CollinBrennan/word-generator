# Wrdz

Wrdz is a generator that creates random words based on a set of user-defined rules. The most common use of the generator is to create a list of words for [constructed languages](https://en.wikipedia.org/wiki/Constructed_language).

## Basic Usage

The generator takes two basic inputs in order to start making words:

1. A set of [character groups](#characters)
2. A [pattern](#pattern) that the characters must follow.

## Characters

The characters that can appear in words are defined by a set of inputs called character groups. Character groups take a list of characters separated by spaces. The groups are referenced by a label that you can select from a dropdown menu.

For example, it's common to group all consonants under a group labeled `C`...

```
b c d f g
```

...and all vowels under another group labeled `V`...

```
a e i o u
```

Use any characters and labels as you see fit.

## Pattern

The pattern defines how characters should be arranged in a single syllable of a word. It uses character group labels as a template for the characters that get randomly selected.

For example, given...

- A Character group `C` with characters `p t k`
- A Character group `V` with characters `a o`
- The Pattern `CV`

...the resulting word list would have syllables `pa`, `po`, `ta`, `to`, `ka`, etc.

### Parentheses

Group labels with parentheses means the resulting characters will only appear some of the time. For example, the pattern `(C)V` will result in syllables like `pa` and `po` as well as just `a` and `o`.

### Non-group label characters

Characters in the pattern that are not group labels will output themselves instead. For example, since `s` isn't the label of a character group, the pattern `CVs` would output syllables like `pas`, `pos`, `tas`, etc.

## Rewrites

Rewrites allow a certain sequence of characters in a word to be rewritten as a new sequence. The left text field defines the sequence to be rewritten and the right text field defines its possible replacement sequences, separated by spaces.

For example, given

- A rewrite with sequence `ki` and possible replacements `ko pi`

If the generator produces the word `taki`, it will be outputted as either `tako` or `tapi`.

## Exceptions

Exceptions define a list of character sequences that cannot appear in the final word list, separated by spaces. If a word contains any of the sequences defined in exceptions, it will simply be omitted from the output.
