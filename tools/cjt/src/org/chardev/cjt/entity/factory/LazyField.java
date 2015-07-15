package org.chardev.cjt.entity.factory;

public class LazyField<T> {
	public final T value;

	public LazyField(T value) {
		this.value = value;
	}
}
