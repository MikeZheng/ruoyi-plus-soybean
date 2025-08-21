<script setup lang="ts">
import { useNaiveForm } from '@/hooks/common/form';
import { $t } from '@/locales';
defineOptions({
  name: 'ElbSearch'
});

interface Emits {
  (e: 'reset'): void;
  (e: 'search'): void;
}

const emit = defineEmits<Emits>();

const { formRef, validate, restoreValidation } = useNaiveForm();

const model = defineModel<Api.Env.ElbSearchParams>('model', { required: true });

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
            <NFormItemGi span="24 s:12 m:6" label="elb主键" path="elbId" class="pr-24px">
              <NInput v-model:value="model.elbId" placeholder="请输入elb主键" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="名称" path="name" class="pr-24px">
              <NInput v-model:value="model.name" placeholder="请输入名称" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="ELB状态" path="elbStatus" class="pr-24px">
              <NSelect v-model:value="model.elbStatus" placeholder="请选择ELB状态" :options="[]" clearable />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="网络类型" path="networkType" class="pr-24px">
              <NSelect v-model:value="model.networkType" placeholder="请选择网络类型" :options="[]" clearable />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="vpc" path="vpc" class="pr-24px">
              <NInput v-model:value="model.vpc" placeholder="请输入vpc" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="实例类型" path="instanceLevel" class="pr-24px">
              <NInput v-model:value="model.instanceLevel" placeholder="请输入实例类型" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="主机名" path="hostname" class="pr-24px">
              <NInput v-model:value="model.hostname" placeholder="请输入主机名" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="ELB创建时间" path="elbCreateTime" class="pr-24px">
              <NInput v-model:value="model.elbCreateTime" placeholder="请输入创建时间" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="贷款" path="publicNetBandwidth" class="pr-24px">
              <NInput v-model:value="model.publicNetBandwidth" placeholder="请输入贷款" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="IP地址" path="ipAddress" class="pr-24px">
              <NInput v-model:value="model.ipAddress" placeholder="请输入IP地址" />
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
