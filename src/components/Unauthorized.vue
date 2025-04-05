<template>

    <body>
        <div id="app">
            <div>403</div>
            <div class="txt">
                Forbidden<span class="blink">_</span>
            </div>
        </div>
    </body>
</template>

<script>
export default {
    name: 'Unauthorized'
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Press+Start+2P');

body {
    width: 1920px;
    height: 1080px;
}

* {
    font-family: 'Press Start 2P', cursive;
}

#app {
    background: black;
    display: flex;
    height: 1104px;
    justify-content: center;
    align-items: center;
    color: #54FE55;
    text-shadow: 0px 0px 10px;
    font-size: 8rem;
    flex-direction: column;
    transform: translateY(-24px);
}

#app .txt {
    font-size: 2.2rem;
}

@keyframes blink {
    0% {
        opacity: 0
    }

    49% {
        opacity: 0
    }

    50% {
        opacity: 1
    }

    100% {
        opacity: 1
    }
}

.blink {
    animation-name: blink;
    animation-duration: 1s;
    animation-iteration-count: infinite;
}
</style>