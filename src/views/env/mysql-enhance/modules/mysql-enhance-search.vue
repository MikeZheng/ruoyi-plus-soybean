<script setup lang="ts">
import { useNaiveForm } from '@/hooks/common/form';
import { useDict } from '@/hooks/business/dict';
import { $t } from '@/locales';
defineOptions({
  name: 'MysqlEnhanceSearch'
});

interface Emits {
  (e: 'reset'): void;
  (e: 'search'): void;
}

const emit = defineEmits<Emits>();

const { formRef, validate, restoreValidation } = useNaiveForm();

const model = defineModel<Api.Env.MysqlEnhanceSearchParams>('model', { required: true });

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
            <NFormItemGi span="24 s:12 m:6" label="mysql主键" path="mysqlId" class="pr-24px">
              <NInput v-model:value="model.mysqlId" placeholder="请输入mysql主键" />
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
            <NFormItemGi span="24 s:12 m:6" label="实例类型" path="instanceLevel" class="pr-24px">
              <NInput v-model:value="model.instanceLevel" placeholder="请输入实例类型" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="实例版本" path="instanceVersion" class="pr-24px">
              <NInput v-model:value="model.instanceVersion" placeholder="请输入实例版本" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="地域" path="location" class="pr-24px">
              <NInput v-model:value="model.location" placeholder="请输入地域" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="规格" path="performance" class="pr-24px">
              <NInput v-model:value="model.performance" placeholder="请输入规格" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="所属网络" path="vpc" class="pr-24px">
              <NInput v-model:value="model.vpc" placeholder="请输入所属网络" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="主IPv4内网IP" path="ipv4MajorPrivate" class="pr-24px">
              <NInput v-model:value="model.ipv4MajorPrivate" placeholder="请输入主IPv4内网IP" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="端口" path="port" class="pr-24px">
              <NInput v-model:value="model.port" placeholder="请输入端口" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="计费模式" path="feeMode" class="pr-24px">
              <NInput v-model:value="model.feeMode" placeholder="请输入计费模式" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="mysql创建时间" path="mysqlCreateTime" class="pr-24px">
              <NInput v-model:value="model.mysqlCreateTime" placeholder="请输入mysql创建时间" />
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
