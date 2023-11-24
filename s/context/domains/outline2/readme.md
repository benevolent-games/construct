
outline explained
-----------------

the outline is a state domain that is about all the "stuff" in the project.

props, lights, folders, prefabs, scenes -- anything like that.

- **Data** namespace
  - these are the typescript types which the outliner systems deal with.
  - the outline is highly extensible
    - you can customize the outline to use your own concepts like "folder", "prop", "light", or "my_funny_widget"..
    - the outline systems are compatible with simple primtives, which you can extend to have your own custom meanings
  - there are two data primitives
    - **Block**
      - a block represents a unique unit of data
      - it has a `kind` string that distinguishes ie, "folder", "prop", "light", etc..
      - each block can have `cargo`, which is arbitrary data associated with your editor's own concepts, ie, "prop"
      - each block can have `childReferences`, which specifies a nesting relationship between things
    - **Reference**
      - this is a reference to a block
      - it does not have its own "kind", since it's block has that
      - it can have its own cargo
- **DataFacility**
  - this is how an editor app can declare its own unique outline concepts
  - your declare your app's Concepts using `Data.Concepts`
  - you feed those into your `new DataFacility<MyConcepts>(config)`
  - you provide your own `config` which describes runtime details about your concepts
- **OutlineState**
  - serializable json state
  - this is the ultimate source of truth for what is in the 3d world
  - the outliner panel is a UI where the user can manage all this stuff, organizing stuff into folders, etc
- **OutlineModel**
  - utility for reading the outline state
  - entirely read-only, and based on a signal, so reading from it will be reactive for components
  - available on the context
- **OutlineAdmin**
  - subclass of *OutlineModel* which adds methods for *writing* to the state
  - only available in actions where writing to the state is permitted

