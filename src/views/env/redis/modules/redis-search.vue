<script setup lang="ts">
import { useNaiveForm } from '@/hooks/common/form';
import { useDict } from '@/hooks/business/dict';
import { $t } from '@/locales';
defineOptions({
  name: 'RedisSearch'
});

interface Emits {
  (e: 'reset'): void;
  (e: 'search'): void;
}

const emit = defineEmits<Emits>();

const { formRef, validate, restoreValidation } = useNaiveForm();

const model = defineModel<Api.Env.RedisSearchParams>('model', { required: true });

const { options: envCvmRunningStatusOptions } = useDict('env_cvm_running_status');

async function reset() {
  Object.assign(model.value.params!, {});
  await restoreValidation();
  emit('reset');
}

async function search() {
  await validate();
  emit('search');
}
</script>

<template>
  <NCard :bordered="false" size="small" class="card-wrapper">
    <NCollapse>
      <NCollapseItem :title="$t('common.search')" name="user-search">
        <NForm ref="formRef" :model="model" label-placement="left" :label-width="80">
          <NGrid responsive="screen" item-responsive>
            <NFormItemGi span="24 s:12 m:6" label="redis主键" path="redisId" class="pr-24px">
              <NInput v-model:value="model.redisId" placeholder="请输入redis主键" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="名称" path="name" class="pr-24px">
              <NInput v-model:value="model.name" placeholder="请输入名称" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="运行状态" path="runningStatus" class="pr-24px">
              <NSelect
                v-model:value="model.runningStatus"
                placeholder="请选择运行状态"
                :options="envCvmRunningStatusOptions"
                clearable
              />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="所属项目" path="project" class="pr-24px">
              <NInput v-model:value="model.project" placeholder="请输入所属项目" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="地域" path="location" class="pr-24px">
              <NInput v-model:value="model.location" placeholder="请输入地域" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="可用区" path="az" class="pr-24px">
              <NInput v-model:value="model.az" placeholder="请输入可用区" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="所属网络" path="vpc" class="pr-24px">
              <NInput v-model:value="model.vpc" placeholder="请输入所属网络" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="所在子网" path="vpcSub" class="pr-24px">
              <NInput v-model:value="model.vpcSub" placeholder="请输入所在子网" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="主IPv4内网IP" path="ipv4" class="pr-24px">
              <NInput v-model:value="model.ipv4" placeholder="请输入主IPv4内网IP" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="端口" path="port" class="pr-24px">
              <NInput v-model:value="model.port" placeholder="请输入端口" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="架构版本" path="archVersion" class="pr-24px">
              <NInput v-model:value="model.archVersion" placeholder="请输入架构版本" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="产品版本" path="productVersion" class="pr-24px">
              <NInput v-model:value="model.productVersion" placeholder="请输入产品版本" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="租户" path="tenantAppId" class="pr-24px">
              <NInput v-model:value="model.tenantAppId" placeholder="请输入租户" />
            </NFormItemGi>
            <NFormItemGi span="24" class="pr-24px">
              <NSpace class="w-full" justify="end">
                <NButton @click="reset">
                  <template #icon>
                    <icon-ic-round-refresh class="text-icon" />
                  </template>
                  {{ $t('common.reset') }}
                </NButton>
                <NButton type="primary" ghost @click="search">
                  <template #icon>
                    <icon-ic-round-search class="text-icon" />
                  </template>
                  {{ $t('common.search') }}
                </NButton>
              </NSpace>
            </NFormItemGi>
          </NGrid>
        </NForm>
      </NCollapseItem>
    </NCollapse>
  </NCard>
</template>

<style scoped></style>
