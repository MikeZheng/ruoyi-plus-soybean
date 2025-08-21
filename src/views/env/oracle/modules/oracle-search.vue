<script setup lang="ts">
import { useNaiveForm } from '@/hooks/common/form';
import { useDict } from '@/hooks/business/dict';
import { $t } from '@/locales';
defineOptions({
  name: 'OracleSearch'
});

interface Emits {
  (e: 'reset'): void;
  (e: 'search'): void;
}

const emit = defineEmits<Emits>();

const { formRef, validate, restoreValidation } = useNaiveForm();

const model = defineModel<Api.Env.OracleSearchParams>('model', { required: true });

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
            <NFormItemGi span="24 s:12 m:6" label="oracle主键" path="oracleId" class="pr-24px">
              <NInput v-model:value="model.oracleId" placeholder="请输入oracle主键" />
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
            <NFormItemGi span="24 s:12 m:6" label="版本" path="version" class="pr-24px">
              <NInput v-model:value="model.version" placeholder="请输入版本" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="配置" path="performance" class="pr-24px">
              <NInput v-model:value="model.performance" placeholder="请输入配置" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="库空间限额(GB)" path="maxTablespace" class="pr-24px">
              <NInput v-model:value="model.maxTablespace" placeholder="请输入库空间限额(GB)" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="最大IOPS" path="maxIops" class="pr-24px">
              <NInput v-model:value="model.maxIops" placeholder="请输入最大IOPS" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="最大IOMB(MB)" path="maxIomb" class="pr-24px">
              <NInput v-model:value="model.maxIomb" placeholder="请输入最大IOMB(MB)" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="角色" path="role" class="pr-24px">
              <NInput v-model:value="model.role" placeholder="请输入角色" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="可用区" path="az" class="pr-24px">
              <NInput v-model:value="model.az" placeholder="请输入可用区" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="网络" path="vpc" class="pr-24px">
              <NInput v-model:value="model.vpc" placeholder="请输入网络" />
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
