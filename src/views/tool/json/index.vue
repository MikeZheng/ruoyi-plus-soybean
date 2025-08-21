<script setup lang="ts">
import { ref } from 'vue';
import { useClipboard } from '@vueuse/core';
import { NButton, NInput, NSpace, useMessage } from 'naive-ui';

const { copy } = useClipboard();
const message = useMessage();

const jsonInput = ref('');
const formattedJson = ref('');

function formatJSON() {
  try {
    const parsed = JSON.parse(jsonInput.value);
    formattedJson.value = JSON.stringify(parsed, null, 2);
  } catch (error) {
    message.error(`JSON格式错误，请检查输入内容${error}`);
    formattedJson.value = '';
  }
}

function compressJSON() {
  try {
    const parsed = JSON.parse(jsonInput.value);
    formattedJson.value = JSON.stringify(parsed);
  } catch (error) {
    message.error(`JSON格式错误，无法压缩${error}`);
  }
}

function copyResult() {
  if (formattedJson.value) {
    copy(formattedJson.value);
    message.success('已复制到剪贴板');
  }
}

function clearAll() {
  jsonInput.value = '';
  formattedJson.value = '';
}
</script>

<template>
  <div class="h-full bg-white p-4 dark:bg-dark">
    <div class="h-full flex flex-col gap-4">
      <div class="flex flex-1 gap-4">
        <div class="flex flex-col flex-1">
          <h3 class="mb-2 text-lg font-medium">原始JSON</h3>
          <NInput
            v-model:value="jsonInput"
            type="textarea"
            placeholder="请输入JSON字符串"
            :autosize="{ minRows: 30 }"
            class="flex-1"
          />
        </div>

        <div class="flex flex-col justify-center gap-2">
          <NButton type="primary" @click="formatJSON">格式化</NButton>
          <NButton @click="compressJSON">压缩</NButton>
          <NButton :disabled="!formattedJson" @click="copyResult">复制结果</NButton>
          <NButton @click="clearAll">清空</NButton>
        </div>

        <div class="flex flex-col flex-1">
          <h3 class="mb-2 text-lg font-medium">处理结果</h3>
          <NInput
            v-model:value="formattedJson"
            type="textarea"
            readonly
            :autosize="{ minRows: 30 }"
            class="flex-1 font-mono"
          />
        </div>
      </div>

      <NSpace class="mt-4" justify="center">
        <NButton type="info" ghost @click="formatJSON">在线格式化</NButton>
        <NButton type="info" ghost @click="compressJSON">JSON压缩</NButton>
      </NSpace>
    </div>
  </div>
</template>

<style scoped>
.font-mono {
  font-family: Monaco, Consolas, monospace;
}
</style>
