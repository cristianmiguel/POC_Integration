<template>
  <div :class="skeletonClasses" :style="skeletonStyle"></div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'text' | 'circular' | 'rectangular'
  width?: string | number
  height?: string | number
  borderRadius?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'rectangular',
  width: '100%',
  height: '20px'
})

const skeletonClasses = computed(() => {
  return [
    'skeleton-loader',
    `skeleton-loader--${props.variant}`
  ]
})

const skeletonStyle = computed(() => {
  const style: Record<string, string> = {}
  
  if (props.width) {
    style.width = typeof props.width === 'number' ? `${props.width}px` : props.width
  }
  
  if (props.height) {
    style.height = typeof props.height === 'number' ? `${props.height}px` : props.height
  }
  
  if (props.borderRadius) {
    style.borderRadius = props.borderRadius
  }
  
  return style
})
</script>

<style scoped>
.skeleton-loader {
  background: linear-gradient(
    90deg,
    #f0f0f0 0px,
    #e0e0e0 40px,
    #f0f0f0 80px
  );
  background-size: 200px 100%;
  animation: skeleton-loading 1.2s ease-in-out infinite;
}

@media (prefers-color-scheme: dark) {
  .skeleton-loader {
    background: linear-gradient(
      90deg,
      #2a2a2a 0px,
      #3a3a3a 40px,
      #2a2a2a 80px
    );
    background-size: 200px 100%;
  }
}

.skeleton-loader--text {
  border-radius: var(--radius-sm);
}

.skeleton-loader--circular {
  border-radius: 50%;
}

.skeleton-loader--rectangular {
  border-radius: var(--radius-md);
}

@keyframes skeleton-loading {
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
}
</style>
