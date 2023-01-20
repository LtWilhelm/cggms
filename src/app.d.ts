// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Error {}
	// interface Locals {}
	// interface PageData {}
	// interface Platform {}
}

declare namespace svelteHTML {
  // enhance elements
  // interface IntrinsicElements {
  //     'my-custom-element': { someattribute: string; 'on:event': (e: CustomEvent<any>) => void };
  // }
  // enhance attributes
  interface HTMLAttributes<T> {
      'on:outclick'?: (event: any) => any;
  }
}

