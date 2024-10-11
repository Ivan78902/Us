export interface Photo {
  id: string;
  src: string;
  caption: string;
}

// We'll no longer export a default set of photos.
// The PhotoAlbum component will manage its own state.