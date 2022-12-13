import React from 'react';
import styles from './OverlayTest.css';

export def
ault function OverlayTest() {
  return (<div class="wrapper">
  <div class="overlay">
    <div class="banner">
      Some very useful information that every use should see clearly
    </div>
    
    <div class="overlay-content">
      <header class="overlay-row">
        <div class="widget" style="width: 320px">
          <button>
            Exit or something
          </button>
        </div>

        <div class="widget">
          <button>
            Open knowledge base or something
          </button>
        </div>
      </header>

      <div class="overlay-row toolbar-row">
        <div class="widget" style="height: 240px; width: 32px">

        </div>
      </div>

      <footer class="overlay-row">
        <div class="widget" style="width: 320px">
          <button>
            Change view or something
          </button>
        </div>

        <div class="widget">
          <button>
            Go fullscreen or something
          </button>
        </div>
      </footer>
    </div>
  </div>

  <div class="content">
    <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>

    <button>
      I understand
    </button>
  </div>
</div>
  );
}