

<script defer src="https://cdn.jsdelivr.net/npm/@imacrayon/alpine-ajax@0.5.0/dist/cdn.min.js"></script>
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.11.1/dist/cdn.min.js"></script>

<ul id="comments">
  <li>Comment #1</li>
</ul>
<form x-init x-target="comments" method="post" action="/comment">
  <input aria-label="Comment text" name="text" required />
  <button>Submit</button>
</form>
