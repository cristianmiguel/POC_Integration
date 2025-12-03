<template>
  <button 
    :class="buttonClasses" 
    :disabled="disabled || loading"
    :type="type"
    @click="handleClick"
  >
    <span v-if="loading" class="button-spinner"></span>
    <slot v-else />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  fullWidth?: boolean
  type?: 'button' | 'submit' | 'reset'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
  fullWidth: false,
  type: 'button'
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const buttonClasses = computed(() => {
  return [
    'base-button',
    `base-button--${props.variant}`,
    `base-button--${props.size}`,
    {
      'base-button--full-width': props.fullWidth,
      'base-button--loading': props.loading
    }
  ]
})

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>

<style scoped>
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  font-weight: 600;
  border-radius: var(--radius-lg);
  transition: all var(--transition-base);
  position: relative;
  white-space: nowrap;
}

/* Sizes */
.base-button--sm {
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: var(--font-size-sm);
}

.base-button--md {
  padding: var(--spacing-md) var(--spacing-xl);
  font-size: var(--font-size-base);
}

.base-button--lg {
  padding: var(--spacing-lg) var(--spacing-2xl);
  font-size: var(--font-size-lg);
}

/* Variants */
.base-button--primary {
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
  color: white;
  box-shadow: var(--shadow-md);
}

.base-button--primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.base-button--primary:active:not(:disabled) {
  transform: translateY(0);
}

.base-button--secondary {
  background: linear-gradient(135deg, var(--color-secondary) 0%, var(--color-secondary-dark) 100%);
  color: white;
  box-shadow: var(--shadow-md);
}

.base-button--secondary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.base-button--outline {
  background: transparent;
  border: 2px solid var(--color-primary);
  color: var(--color-primary);
}

.base-button--outline:hover:not(:disabled) {
  background: var(--color-primary);
  color: white;
}

.base-button--ghost {
  background: transparent;
  color: var(--color-text-primary);
}

.base-button--ghost:hover:not(:disabled) {
  background: var(--color-surface);
}

.base-button--danger {
  background: var(--color-error);
  color: white;
}

.base-button--danger:hover:not(:disabled) {
  background: #dc2626;
  transform: translateY(-2px);
}

/* Full Width */
.base-button--full-width {
  width: 100%;
}

/* Loading State */
.base-button--loading {
  pointer-events: none;
}

.button-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

/* Disabled State */
.base-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none !important;
}
</style>
